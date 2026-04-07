import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  version: {
    type: Number,
    default: 1,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['interest', 'aptitude', 'personality', 'skills', 'preference', 'background'],
    required: true,
  },
  estimated_time_minutes: {
    type: Number,
    default: 15,
  },
  total_questions: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

assessmentSchema.index({ is_active: 1 });
assessmentSchema.index({ type: 1 });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
