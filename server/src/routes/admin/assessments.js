import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { createAssessmentSchema, createQuestionSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/assessmentController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get('/', ctrl.listAssessments);
router.post('/', validate(createAssessmentSchema), ctrl.createAssessment);
router.put('/:id', validate(createAssessmentSchema), ctrl.updateAssessment);
router.delete('/:id', ctrl.deleteAssessment);

// Questions
router.get('/questions', ctrl.listQuestions);
router.post('/questions', validate(createQuestionSchema), ctrl.createQuestion);
router.put('/questions/:id', ctrl.updateQuestion);
router.delete('/questions/:id', ctrl.deleteQuestion);

export default router;
