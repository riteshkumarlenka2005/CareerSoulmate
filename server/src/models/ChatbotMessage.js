import mongoose from 'mongoose';

const chatbotMessageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatbotConversation',
    required: true,
  },
  sender_type: {
    type: String,
    enum: ['user', 'bot', 'system'],
    required: true,
  },
  message_text: {
    type: String,
    required: true,
  },
  intent: {
    type: String,
    default: '',
    // e.g., 'career_query', 'skill_query', 'roadmap_query', 'faq', 'general'
  },
  response_metadata: {
    model_used: { type: String, default: '' },
    tokens_used: { type: Number, default: 0 },
    data_sources: [{ type: String }],
  },
}, {
  timestamps: true,
});

chatbotMessageSchema.index({ conversation: 1, createdAt: 1 });

const ChatbotMessage = mongoose.model('ChatbotMessage', chatbotMessageSchema);

export default ChatbotMessage;
