import axios from 'axios';

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || '52956ed2';
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || 'd655cbb3903fe007162559e3da0b8712';
const MUSE_API_KEY = process.env.MUSE_API_KEY || '2f8e432dc5b7543c38a5db244e0788fb0d2c236501edc96cd167e224f485a810';
const FINDWORK_API_KEY = process.env.FINDWORK_API_KEY || '5405121a2bd668c22a0b9e0c1e4b2e0beb5a914a';

/**
 * Fetches Job Market data from Adzuna based on job title
 * @param {string} jobTitle 
 * @param {string} countryCode ('in' for India, 'us' for US, etc)
 */
export const fetchJobsFromAdzuna = async (jobTitle, countryCode = 'in') => {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/1`;
    const response = await axios.get(url, {
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_APP_KEY,
        what: jobTitle,
        results_per_page: 50
      }
    });

    if (response.data && response.data.results) {
       // Estimate demand score simply by total results found globally
       const totalListings = response.data.count;
       const demandScore = Math.min(100, Math.max(10, Math.floor((totalListings / 1000) * 100)));
       
       let salaries = response.data.results.filter(r => r.salary_min && r.salary_max);
       let avgMin = salaries.length > 0 ? (salaries.reduce((a, b) => a + b.salary_min, 0) / salaries.length) : null;
       let avgMax = salaries.length > 0 ? (salaries.reduce((a, b) => a + b.salary_max, 0) / salaries.length) : null;

       return {
         source: 'Adzuna',
         demand_score: demandScore,
         salary_min: avgMin ? Math.round(avgMin) : null,
         salary_max: avgMax ? Math.round(avgMax) : null,
         raw_count: totalListings
       };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching Adzuna jobs for ${jobTitle}:`, error.message);
    return null;
  }
};

/**
 * Fetches generic remote IT/EU jobs from Arbeitnow (No Auth)
 * Useful for determining remote share percentage and trending remote skills
 */
export const fetchJobsFromArbeitnow = async (searchQuery) => {
  try {
     const url = `https://www.arbeitnow.com/api/job-board-api`;
     const response = await axios.get(url, { params: { query: searchQuery } });

     if (response.data && response.data.data) {
        return {
           source: 'Arbeitnow',
           remote_jobs_found: response.data.data.length
        };
     }
     return null;
  } catch (error) {
     console.error(`Error fetching Arbeitnow jobs:`, error.message);
     return null;
  }
};

/**
 * Fetches Career & Job advice metadata from The Muse
 * @param {string} category 
 */
export const fetchJobsFromTheMuse = async (category) => {
   try {
      const url = `https://www.themuse.com/api/public/jobs`;
      const response = await axios.get(url, {
         headers: {
            // Usually auth goes into header or param based on docs. Let's pass via params as most v1 api expects
         },
         params: {
            api_key: MUSE_API_KEY,
            category: category,
            page: 1
         }
      });
      
      if (response.data && response.data.results) {
         return {
            source: 'The Muse',
            listings_found: response.data.total
         };
      }
      return null;
   } catch(error) {
      console.error('Error fetching The Muse API:', error.message);
      return null;
   }
};

/**
 * Secondary Job Board API fallback (Findwork)
 * @param {string} jobTitle 
 */
export const fetchJobsFromFindwork = async (jobTitle) => {
   try {
      const url = `https://findwork.dev/api/jobs/`;
      const response = await axios.get(url, {
         headers: {
            'Authorization': `Token ${FINDWORK_API_KEY}`
         },
         params: {
            search: jobTitle
         }
      });
      
      if (response.data && response.data.results) {
         return {
            source: 'Findwork',
            listings_found: response.data.count
         };
      }
      return null;
   } catch(error) {
      console.error('Error fetching Findwork API:', error.message);
      return null;
   }
};
