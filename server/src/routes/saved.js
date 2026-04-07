import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { savedItemSchema } from '../validators/apiValidator.js';
import * as savedItemController from '../controllers/savedItemController.js';

const router = express.Router();

router.get('/', authenticateToken, savedItemController.listSaved);
router.post('/', authenticateToken, validate(savedItemSchema), savedItemController.saveItem);
router.delete('/:id', authenticateToken, savedItemController.removeSaved);

export default router;
