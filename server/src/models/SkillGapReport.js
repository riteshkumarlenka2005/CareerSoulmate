import mongoose from 'mongoose';

const skillGapReportSchema = new mongoose.Schema({
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
  matched_skills: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    skill_name: { type: String },
    user_level: { type: String },
    required_level: { type: String },
    status: { type: String, enum: ['matched', 'partial', 'weak'], default: 'matched' },
  }],
  missing_skills: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    skill_name: { type: String },
    required_level: { type: String },
    importance: { type: String },
    priority: { type: Number, default: 0 },
  }],
  gap_score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  recommended_actions: [{
    action: { type: String },
    priority: { type: Number, default: 0 },
    estimated_time: { type: String, default: '' },
  }],
  overall_readiness: {
    type: String,
    enum: ['ready', 'almost_ready', 'needs_work', 'significant_gap'],
    default: 'needs_work',
  },
}, {
  timestamps: true,
});

skillGapReportSchema.index({ user: 1, career: 1 });
skillGapReportSchema.index({ user: 1, createdAt: -1 });

const SkillGapReport = mongoose.model('SkillGapReport', skillGapReportSchema);

export default SkillGapReport;
