import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { skillGapSchema } from '../validators/apiValidator.js';
import * as skillGapController from '../controllers/skillGapController.js';

const router = express.Router();

router.post('/analyze', authenticateToken, validate(skillGapSchema), skillGapController.analyze);
router.get('/history', authenticateToken, skillGapController.getHistory);

export default router;
