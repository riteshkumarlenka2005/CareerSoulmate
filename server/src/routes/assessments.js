import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { submitAnswersSchema } from '../validators/apiValidator.js';
import * as assessmentController from '../controllers/assessmentController.js';

const router = express.Router();

// GET /api/assessments — List active assessments
router.get('/', authenticateToken, assessmentController.listAssessments);

// GET /api/assessments/attempts — User's attempt history (must be before /:id)
router.get('/attempts', authenticateToken, assessmentController.getAttempts);

// GET /api/assessments/attempts/:attemptId — Single attempt result
router.get('/attempts/:attemptId', authenticateToken, assessmentController.getAttemptResult);

// GET /api/assessments/:id — Get assessment with questions
router.get('/:id', authenticateToken, assessmentController.getAssessment);

// POST /api/assessments/:id/start — Start new attempt
router.post('/:id/start', authenticateToken, assessmentController.startAttempt);

// POST /api/assessments/attempts/:attemptId/submit — Submit answers
router.post('/attempts/:attemptId/submit', authenticateToken, validate(submitAnswersSchema), assessmentController.submitAttempt);

export default router;
