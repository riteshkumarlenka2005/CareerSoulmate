import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to fetch real-time jobs
router.get('/', async (req, res) => {
    try {
        const { q = 'developer', limit = 10, page = 0, source = 'theirstack' } = req.query;
        
        let jobs = [];

        if (source === 'theirstack' || source === 'all') {
            try {
                // Using TheirStack API
                const theirStackResponse = await axios.post('https://api.theirstack.com/v1/jobs/search', {
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
                
                if (theirStackResponse.data?.data) {
                    jobs = [...jobs, ...theirStackResponse.data.data.map(job => ({
                        id: job.id,
                        job_title: job.job_title,
                        company: job.company,
                        location: job.location || job.country,
                        date_posted: job.date_posted,
                        description: job.description,
                        url: job.url,
                        salary_string: job.salary_string,
                        employment_statuses: job.employment_statuses,
                        remote: job.remote,
                        hybrid: job.hybrid,
                        keyword_slugs: job.keyword_slugs,
                        source: 'TheirStack'
                    }))];
                }
            } catch (err) {
                console.error("TheirStack fetch failed:", err.message);
            }
        }

        if (source === 'crustdata' || source === 'all') {
            try {
                // Using Crustdata B2B Jobs API
                // Note: The specific endpoint schema might need adjusting depending on actual Crustdata documentation
                const crustdataResponse = await axios.post('https://api.crustdata.com/screener/job/', {
                    "filters": [
                        {
                            "filter_type": "job_title",
                            "type": "in",
                            "value": [`${q}`]
                        }
                    ],
                    "page": parseInt(page, 10) + 1,
                    "limit": parseInt(limit, 10)
                }, {
                    headers: {
                        'Authorization': `Token 2416cdcc8f22beacb4000c082f198c20ac97622b`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (crustdataResponse.data?.data) {
                    jobs = [...jobs, ...crustdataResponse.data.data.map((job, index) => ({
                        id: job.job_id || `crust-${index}`,
                        job_title: job.title || job.job_title,
                        company: job.company_name || job.company,
                        location: job.location,
                        date_posted: job.posted_date || job.date_posted,
                        description: job.description,
                        url: job.job_url || job.url,
                        salary_string: null,
                        employment_statuses: [job.workplace_type || 'Full-time'],
                        remote: job.workplace_type?.includes('remote'),
                        hybrid: job.workplace_type?.includes('hybrid'),
                        keyword_slugs: [job.category].filter(Boolean),
                        source: 'Crustdata'
                    }))];
                }
            } catch (err) {
                console.error("Crustdata fetch failed:", err.message);
            }
        }

        if (source === 'coresignal' || source === 'all') {
            try {
                // Using Coresignal APIs
                const coresignalResponse = await axios.post('https://api.coresignal.com/v2/job/search', {
                    title: `.*${q}.*`,
                    limit: parseInt(limit, 10)
                }, {
                    headers: {
                        'Authorization': `Bearer Z8M75qeehREojk6tkZwD6S7joYCZGdTD`,
                        'Content-Type': 'application/json'
                    }
                });

                if (coresignalResponse.data && Array.isArray(coresignalResponse.data)) {
                    jobs = [...jobs, ...coresignalResponse.data.map(job => ({
                        id: job.id,
                        job_title: job.title,
                        company: job.company_name,
                        location: job.location,
                        date_posted: job.created_at,
                        description: job.description,
                        url: job.url,
                        salary_string: job.salary ? `${job.salary}` : null,
                        employment_statuses: [job.employment_type || 'Full-time'],
                        remote: job.is_remote ? true : false,
                        hybrid: false,
                        keyword_slugs: [job.seniority].filter(Boolean),
                        source: 'Coresignal'
                    }))];
                }
            } catch (err) {
                console.error("Coresignal fetch failed:", err.message);
            }
        }

        res.json({ data: jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

export default router;
