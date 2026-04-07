import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'general',
    // e.g., 'general', 'assessment', 'career', 'platform', 'account'
  },
  order: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

faqSchema.index({ category: 1, order: 1 });
faqSchema.index({ is_active: 1 });
faqSchema.index({ question: 'text', answer: 'text' });

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
