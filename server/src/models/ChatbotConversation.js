import mongoose from 'mongoose';

const chatbotConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  session_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'New Conversation',
  },
  context: {
    target_career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', default: null },
    topic: { type: String, default: '' },
  },
  message_count: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

chatbotConversationSchema.index({ user: 1, createdAt: -1 });
chatbotConversationSchema.index({ session_id: 1 });

const ChatbotConversation = mongoose.model('ChatbotConversation', chatbotConversationSchema);

export default ChatbotConversation;
