import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import * as dashboardController from '../controllers/dashboardController.js';

const router = express.Router();
router.get('/', authenticateToken, dashboardController.getDashboard);
export default router;
