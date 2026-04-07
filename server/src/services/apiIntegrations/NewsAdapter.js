import axios from 'axios';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '345908cdfc672c6e9c1a661585e0122f';
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || 'pub_40094056f7fc45ab90a2bb724c5c0771';
const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY || '4DP-YZC5S2shCnTN04irtkkcdCSRhdsnHW6kY6BFp_fDh9F2';

export const fetchNewsFromGNews = async (query) => {
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search`, {
       params: { q: `${query} job market`, lang: 'en', max: 3, apikey: GNEWS_API_KEY }
    });
    return response.data?.articles?.map(a => ({
       title: a.title, url: a.url, published_at: new Date(a.publishedAt), source: a.source?.name
    })) || [];
  } catch (error) { console.error('GNews Error:', error.message); return []; }
};

export const fetchNewsFromNewsData = async (query) => {
   try {
     const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: { q: `"${query}" career`, language: 'en', apikey: NEWSDATA_API_KEY, size: 3 }
     });
     return response.data?.results?.map(a => ({
        title: a.title, url: a.link, published_at: new Date(a.pubDate), source: a.source_id
     })) || [];
   } catch (error) { console.error('NewsData Error:', error.message); return []; }
};

export const fetchNewsFromCurrents = async (query) => {
   try {
      const response = await axios.get(`https://api.currentsapi.services/v1/search`, {
         params: { keywords: `${query} industry`, language: 'en', apiKey: CURRENTS_API_KEY }
      });
      return response.data?.news?.slice(0, 3).map(a => ({
         title: a.title, url: a.url, published_at: new Date(a.published), source: 'Currents'
      })) || [];
   } catch (error) { console.error('Currents Error:', error.message); return []; }
};

/** Aggregates news streams across all providers */
export const getAggregatedCareerNews = async (careerTitle) => {
   const [gnews, newsdata, currents] = await Promise.allSettled([
      fetchNewsFromGNews(careerTitle),
      fetchNewsFromNewsData(careerTitle),
      fetchNewsFromCurrents(careerTitle)
   ]);

   const allNews = [
      ...(gnews.status === 'fulfilled' ? gnews.value : []),
      ...(newsdata.status === 'fulfilled' ? newsdata.value : []),
      ...(currents.status === 'fulfilled' ? currents.value : [])
   ];

   // Sort by newest and ensure uniqueness
   return allNews
     .sort((a,b) => b.published_at - a.published_at)
     .filter((v,i,a) => a.findIndex(t => t.title === v.title) === i)
     .slice(0, 5); // Keep top 5 latest news articles per career
};
