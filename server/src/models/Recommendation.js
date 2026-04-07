import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true,
  },
  match_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  score_breakdown: {
    interest_match: { type: Number, default: 0 },
    skill_match: { type: Number, default: 0 },
    education_match: { type: Number, default: 0 },
    preference_match: { type: Number, default: 0 },
    stage_fit: { type: Number, default: 0 },
  },
  reason_text: {
    type: String,
    default: '',
  },
  reason_points: {
    type: [String],
    default: [],
  },
  source_model: {
    type: String,
    default: 'rule_based_v1',
  },
  batch_id: {
    type: String,
    default: '',
    // Groups recommendations from the same generation run
  },
  rank: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

recommendationSchema.index({ user: 1, createdAt: -1 });
recommendationSchema.index({ user: 1, batch_id: 1 });
recommendationSchema.index({ career: 1 });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
