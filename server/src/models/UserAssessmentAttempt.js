import mongoose from 'mongoose';

const userAssessmentAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned'],
    default: 'in_progress',
  },
  started_at: {
    type: Date,
    default: Date.now,
  },
  submitted_at: {
    type: Date,
    default: null,
  },
  total_score: {
    type: Number,
    default: 0,
  },
  max_possible_score: {
    type: Number,
    default: 0,
  },
  category_scores: {
    type: Map,
    of: Number,
    default: {},
  },
  result_summary: {
    type: String,
    default: '',
  },
  result_json: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  assessment_version: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

userAssessmentAttemptSchema.index({ user: 1, assessment: 1 });
userAssessmentAttemptSchema.index({ user: 1, status: 1 });

const UserAssessmentAttempt = mongoose.model('UserAssessmentAttempt', userAssessmentAttemptSchema);

export default UserAssessmentAttempt;
