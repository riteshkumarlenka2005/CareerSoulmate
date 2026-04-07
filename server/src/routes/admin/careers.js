import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { createCareerSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/careerController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get('/', ctrl.listCareers);
router.post('/', validate(createCareerSchema), ctrl.createCareer);
router.put('/:id', ctrl.updateCareer);
router.delete('/:id', ctrl.deleteCareer);

export default router;
