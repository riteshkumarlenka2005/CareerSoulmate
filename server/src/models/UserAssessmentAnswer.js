import mongoose from 'mongoose';

const userAssessmentAnswerSchema = new mongoose.Schema({
  attempt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAssessmentAttempt',
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssessmentQuestion',
    required: true,
  },
  answer_value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

userAssessmentAnswerSchema.index({ attempt: 1 });
userAssessmentAnswerSchema.index({ question: 1 });

const UserAssessmentAnswer = mongoose.model('UserAssessmentAnswer', userAssessmentAnswerSchema);

export default UserAssessmentAnswer;
