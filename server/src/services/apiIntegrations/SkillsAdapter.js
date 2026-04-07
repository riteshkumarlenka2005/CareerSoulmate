import axios from 'axios';

/**
 * Normalizes a job title and fetches the required skills mapped to that role
 * Using the Open Skills (dataatwork.org) public API
 * @param {string} jobTitle 
 */
export const fetchSkillsForJobTitle = async (jobTitle) => {
   try {
      // 1. Search for the job title to get its UUID
      const searchUrl = `http://api.dataatwork.org/v1/jobs/autocomplete`;
      const searchResponse = await axios.get(searchUrl, {
         params: { contains: jobTitle }
      });

      if (searchResponse.data && searchResponse.data.length > 0) {
         // Get the most relevant UUID
         const jobUuid = searchResponse.data[0].uuid;

         // 2. Fetch skills associated with that UUID
         const skillsUrl = `http://api.dataatwork.org/v1/jobs/${jobUuid}/related_skills`;
         const skillsResponse = await axios.get(skillsUrl);

         if (skillsResponse.data && skillsResponse.data.skills) {
             // Extract top 10 most important skills based on their internal significance/weight
             return skillsResponse.data.skills
                .sort((a,b) => b.importance - a.importance)
                .slice(0, 10)
                .map(s => s.skill_name);
         }
      }
      return [];
   } catch(error) {
      console.error(`Error fetching Open Skills for ${jobTitle}:`, error.message);
      return [];
   }
};
