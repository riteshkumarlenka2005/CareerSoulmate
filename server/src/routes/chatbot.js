import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { chatMessageSchema } from '../validators/apiValidator.js';
import * as chatbotController from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/message', authenticateToken, validate(chatMessageSchema), chatbotController.sendMessage);
router.get('/conversations', authenticateToken, chatbotController.getConversations);
router.get('/conversations/:id', authenticateToken, chatbotController.getMessages);

export default router;
