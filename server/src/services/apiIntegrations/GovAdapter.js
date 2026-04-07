import axios from 'axios';

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY || '579b464db66ec23bdd000001a22811ad256b4b107b06bde7f49d32c9';

/**
 * Searches the public Indian Govt open dataset for colleges/schemes dynamically
 */
export const fetchPublicColleges = async (stateOrDiscipline) => {
   try {
      const response = await axios.get(`https://api.data.gov.in/resource/9e1cd4bd-3453-4fff-acc9-cd60e5ba6423`, {
         params: {
            'api-key': DATA_GOV_API_KEY,
            format: 'json',
            limit: 10,
         }
      });
      
      // Filter logic if the dataset structure supports it
      return response.data.records || [];
   } catch(error) {
      console.error('DataGov API Error:', error.message);
      return [];
   }
};
