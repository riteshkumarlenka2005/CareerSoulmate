import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { createSkillSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/skillController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get('/', ctrl.listSkills);
router.post('/', validate(createSkillSchema), ctrl.createSkill);
router.put('/:id', ctrl.updateSkill);
router.delete('/:id', ctrl.deleteSkill);

// Career-skill mappings
router.get('/mappings', ctrl.getCareerSkills);
router.post('/mappings', ctrl.addCareerSkill);
router.delete('/mappings/:id', ctrl.removeCareerSkill);

export default router;
