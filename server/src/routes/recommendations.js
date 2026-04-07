import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import * as recommendationController from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/generate', authenticateToken, recommendationController.generate);
router.get('/latest', authenticateToken, recommendationController.getLatest);
router.get('/history', authenticateToken, recommendationController.getHistory);

export default router;
