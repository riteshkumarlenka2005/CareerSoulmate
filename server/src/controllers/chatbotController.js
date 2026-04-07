import ChatbotService from '../services/chatbotService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const sendMessage = catchAsync(async (req, res) => {
  const { message, conversationId } = req.body;
  const result = await ChatbotService.sendMessage(req.user._id, message, conversationId);
  ApiResponse.success(res, 'Message sent', result);
});

export const getConversations = catchAsync(async (req, res) => {
  const conversations = await ChatbotService.getConversations(req.user._id);
  ApiResponse.success(res, 'Conversations retrieved', { conversations });
});

export const getMessages = catchAsync(async (req, res) => {
  const result = await ChatbotService.getMessages(req.user._id, req.params.id);
  ApiResponse.success(res, 'Messages retrieved', result);
});
