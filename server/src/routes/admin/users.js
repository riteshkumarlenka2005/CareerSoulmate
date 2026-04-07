import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import * as ctrl from '../../controllers/admin/userController.js';

const router = express.Router();
router.use(authenticateToken, requireAdmin);

router.get('/', ctrl.listUsers);
router.get('/:id', ctrl.getUserDetail);
router.put('/:id/status', ctrl.updateUserStatus);
router.delete('/:id', ctrl.deleteUser);

export default router;
