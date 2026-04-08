import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        
        const response = await axios.post('https://api.coresignal.com/v2/company_base/search', {
            name: `.*${q}.*`,
            limit: parseInt(limit, 10)
        }, {
            headers: {
                'Authorization': `Bearer Z8M75qeehREojk6tkZwD6S7joYCZGdTD`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ data: response.data });
    } catch (error) {
        console.error('Error fetching companies:', error.message);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
});

export default router;
