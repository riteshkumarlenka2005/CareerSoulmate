import express from 'express';
import validate from '../middlewares/validate.js';
import { careerQuerySchema } from '../validators/apiValidator.js';
import * as careerController from '../controllers/careerController.js';

const router = express.Router();

// GET /api/careers — List careers (paginated, filterable)
router.get('/', validate(careerQuerySchema, 'query'), careerController.listCareers);

// GET /api/careers/categories — Get unique category list
router.get('/categories', careerController.getCategories);

// GET /api/careers/:slug — Career detail by slug
router.get('/:slug', careerController.getCareerBySlug);

// GET /api/careers/:id/skills — Career's required skills
router.get('/:id/skills', careerController.getCareerSkills);

// GET /api/careers/:id/roadmap — Career's roadmap + steps
router.get('/:id/roadmap', careerController.getCareerRoadmap);

export default router;
