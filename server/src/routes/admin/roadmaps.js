import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { createRoadmapSchema, createRoadmapStepSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/roadmapController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get('/', ctrl.listRoadmaps);
router.post('/', validate(createRoadmapSchema), ctrl.createRoadmap);
router.put('/:id', ctrl.updateRoadmap);
router.delete('/:id', ctrl.deleteRoadmap);

// Steps
router.get('/:roadmapId/steps', ctrl.listSteps);
router.post('/steps', validate(createRoadmapStepSchema), ctrl.createStep);
router.put('/steps/:id', ctrl.updateStep);
router.delete('/steps/:id', ctrl.deleteStep);

export default router;
