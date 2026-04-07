import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import * as ctrl from '../../controllers/adminDataController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

// Data Pipeline & Staging
router.get('/staging', ctrl.getStagingRecords);
router.post('/staging/upload', ctrl.uploadManualData);
router.post('/staging/process', ctrl.processApproval);
router.post('/force-sync', ctrl.forceSyncMarketData);
router.get('/sources', ctrl.getDataSources);

export default router;
