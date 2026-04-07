import cron from 'node-cron';
import Career from '../models/Career.js';
import MarketInsight from '../models/MarketInsight.js';
import SourceSyncLog from '../models/SourceSyncLog.js';
import DataSource from '../models/DataSource.js';
import { fetchJobsFromAdzuna, fetchJobsFromTheMuse, fetchJobsFromFindwork } from './apiIntegrations/JobsAdapter.js';
import { getAggregatedCareerNews } from './apiIntegrations/NewsAdapter.js';
import { fetchSkillsForJobTitle } from './apiIntegrations/SkillsAdapter.js';

export const runMarketDataSync = async (sourceId = null) => {
   let log;
   try {
      console.log('--- Starting Daily Market Insights Sync ---');
      
      // Get or create dummy DataSource for logging
      let ds = sourceId ? await DataSource.findById(sourceId) : await DataSource.findOne({ name: 'System Nightly CRON' });
      if (!ds) {
         ds = await DataSource.create({ name: 'System Nightly CRON', type: 'api', sync_frequency: 'daily' });
      }

      log = new SourceSyncLog({ source_id: ds._id });
      await log.save();

      const careers = await Career.find().select('_id title category');
      let recordsUpdated = 0;

      for (const career of careers) {
         // 1. Fetch Adzuna Jobs (Primary)
         let jobStats = await fetchJobsFromAdzuna(career.title);
         
         if (!jobStats || jobStats.raw_count === 0) {
            // Fallback to Findwork (Secondary)
            const findworkStats = await fetchJobsFromFindwork(career.title);
            if (findworkStats && findworkStats.listings_found > 0) {
                 jobStats = {
                    demand_score: Math.min(100, Math.max(10, Math.floor((findworkStats.listings_found / 100) * 100))),
                    salary_min: null,
                    salary_max: null
                 };
            } else {
               // Fallback to The Muse (Intelligence/Content) if Adzuna & Findwork lack data
               const museStats = await fetchJobsFromTheMuse(career.category);
               if (museStats) {
                   jobStats = {
                      demand_score: Math.min(100, Math.max(10, Math.floor((museStats.listings_found / 500) * 100))),
                      salary_min: null,
                      salary_max: null
                   };
               }
            }
         }
         
         // 2. Fetch News (Aggregated)
         const news = await getAggregatedCareerNews(career.title);

         // 3. Fetch canonical Top Skills
         const mappedSkills = await fetchSkillsForJobTitle(career.title);

         if (jobStats || news.length > 0 || mappedSkills.length > 0) {
            await MarketInsight.findOneAndUpdate(
               { career_id: career._id }, 
               {
                  $set: {
                     demand_score: jobStats?.demand_score || 50,
                     salary_min: jobStats?.salary_min || null,
                     salary_max: jobStats?.salary_max || null,
                     related_news_articles: news,
                     top_skills: mappedSkills,
                     fetched_at: new Date()
                  }
               },
               { upsert: true, new: true }
            );
            recordsUpdated++;
         }
         
         // Respect free-tier API rate limits with small 1 second delay
         await new Promise(r => setTimeout(r, 1000));
      }

      log.status = 'success';
      log.records_fetched = careers.length;
      log.records_updated = recordsUpdated;
      log.ended_at = new Date();
      await log.save();
      
      ds.last_synced_at = new Date();
      await ds.save();

      console.log('--- Market Insights Sync Complete ---');
   } catch(error) {
      console.error('Market Sync Error:', error.message);
      if (log) {
         log.status = 'failed';
         log.error_message = error.message;
         log.ended_at = new Date();
         await log.save();
      }
   }
};

// Initialize Cron Jobs
export const initCronJobs = () => {
   // Run completely automatically at Midnight (00:00) every day
   cron.schedule('0 0 * * *', () => {
      runMarketDataSync();
   });
   console.log('CRON Scheduler initialized successfully!');
};
