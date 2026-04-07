import axios from 'axios';

const IPIFY_API_KEY = process.env.IPIFY_API_KEY || 'at_mbb5bdgB1JQPiPpPJwDNxKeTtMqss';

/**
 * Grabs location context based on client IP to localize Job searches
 * @param {string} ipAddress 
 */
export const fetchLocationFromIP = async (ipAddress) => {
  try {
     const response = await axios.get('https://geo.ipify.org/api/v2/country,city', {
        params: {
           apiKey: IPIFY_API_KEY,
           ipAddress: ipAddress
        }
     });

     if (response.data && response.data.location) {
        return {
           country: response.data.location.country,
           region: response.data.location.region,
           city: response.data.location.city,
           lat: response.data.location.lat,
           lng: response.data.location.lng,
        };
     }
     return null;
  } catch (err) {
     console.error('IPify Geo API Error:', err.message);
     return null;
  }
};
