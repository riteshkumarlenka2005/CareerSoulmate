import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to fetch real-time jobs from TheirStack
router.get('/', async (req, res) => {
    try {
        const { q = 'developer', limit = 10, page = 0 } = req.query;
        
        // Using TheirStack API
        const response = await axios.post('https://api.theirstack.com/v1/jobs/search', {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            job_title_or: [`${q}`],
            posted_at_max_age_days: 7 // Mandatory filter for TheirStack
        }, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOjEsImp0aSI6IjY1ODY4ZGM5LWUyMmYtNDliMi1hOWYzLWM1NTU5YTYyYjBkZiIsImNyZWF0ZWRfYnkiOjE1NjY5MiwicGVybWlzc2lvbnMiOltdLCJhdWQiOiJhcGkiLCJpYXQiOjE3NzU2NDc2MTksInN1YiI6IjE1NjAyOSIsIm5hbWUiOiJDYXJlZXJTb3VsbWF0ZSBcdTIwMTMgVGhlaXJTdGFjayBKb2IgSW50ZWxsaWdlbmNlIEFQSSIsImVtYWlsIjoibGVua2FyaXRlc2hrdW1hcjIwMDVAZ21haWwuY29tIn0.DY5dZaQUaiPR3Gm5FYaqcUezXQqt_uvPmrTSmwmGIxA`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching jobs from TheirStack:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

export default router;
