import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
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
  estimated_duration: {
    type: String,
    default: '',
    // e.g., '6 months', '1 year'
  },
  difficulty_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

roadmapSchema.index({ career: 1 });
roadmapSchema.index({ is_active: 1 });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
