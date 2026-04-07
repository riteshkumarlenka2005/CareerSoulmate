import express from 'express';
import { authenticateToken } from '../../middlewares/authMiddleware.js';
import { requireAdmin } from '../../middlewares/adminMiddleware.js';
import validate from '../../middlewares/validate.js';
import { createFAQSchema } from '../../validators/apiValidator.js';
import * as ctrl from '../../controllers/admin/faqController.js';

const router = express.Router();

// Public FAQs (no auth)
router.get('/public', ctrl.getPublicFAQs);

// Admin CRUD
router.get('/', authenticateToken, requireAdmin, ctrl.listFAQs);
router.post('/', authenticateToken, requireAdmin, validate(createFAQSchema), ctrl.createFAQ);
router.put('/:id', authenticateToken, requireAdmin, ctrl.updateFAQ);
router.delete('/:id', authenticateToken, requireAdmin, ctrl.deleteFAQ);

export default router;
