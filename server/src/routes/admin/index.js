import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { broadcastNotificationSchema, systemSettingSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/dashboardController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

// Dashboard analytics
router.get('/dashboard', ctrl.getDashboard);

// System settings
router.get('/settings', ctrl.getSettings);
router.put('/settings', validate(systemSettingSchema), ctrl.updateSetting);

// Broadcast notifications
router.post('/notifications/broadcast', validate(broadcastNotificationSchema), ctrl.broadcastNotification);

// Activity logs
router.get('/logs', ctrl.getLogs);

export default router;
