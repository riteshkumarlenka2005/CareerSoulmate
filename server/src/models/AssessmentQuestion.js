import mongoose from 'mongoose';

const assessmentQuestionSchema = new mongoose.Schema({
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  question_text: {
    type: String,
    required: true,
  },
  question_type: {
    type: String,
    enum: ['single_choice', 'multiple_choice', 'scale', 'yes_no'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    // e.g., 'realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'
    // or 'communication', 'problem_solving', 'digital_skills', etc.
  },
  subcategory: {
    type: String,
    default: '',
  },
  options: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
    score: { type: Number, default: 0 },
  }],
  weight: {
    type: Number,
    default: 1,
    min: 0,
  },
  order_no: {
    type: Number,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  explanation: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

assessmentQuestionSchema.index({ assessment: 1, order_no: 1 });
assessmentQuestionSchema.index({ category: 1 });
assessmentQuestionSchema.index({ is_active: 1 });

const AssessmentQuestion = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);

export default AssessmentQuestion;
