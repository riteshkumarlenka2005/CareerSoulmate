import mongoose from 'mongoose';

const roadmapStepSchema = new mongoose.Schema({
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true,
  },
  step_no: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  resource_links: [{
    title: { type: String, default: '' },
    url: { type: String, default: '' },
    type: { type: String, enum: ['video', 'article', 'course', 'tool', 'other'], default: 'other' },
  }],
  duration_estimate: {
    type: String,
    default: '',
    // e.g., '2 weeks', '1 month'
  },
  skills_covered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }],
}, {
  timestamps: true,
});

roadmapStepSchema.index({ roadmap: 1, step_no: 1 });

const RoadmapStep = mongoose.model('RoadmapStep', roadmapStepSchema);

export default RoadmapStep;
