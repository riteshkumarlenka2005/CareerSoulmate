import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  short_description: {
    type: String,
    default: '',
  },
  full_description: {
    type: String,
    default: '',
  },
  suitable_for: {
    type: [String],
    default: [],
  },
  suitable_interests: {
    type: [String],
    default: [],
    // e.g., ['realistic', 'investigative', 'analytical']
  },
  required_education: {
    type: String,
    enum: ['class10', 'class12', 'undergraduate', 'postgraduate', 'any', 'none'],
    default: 'any',
  },
  salary_range: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
  },
  growth_outlook: {
    type: String,
    enum: ['high', 'medium', 'low', 'very_high'],
    default: 'medium',
  },
  difficulty_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate',
  },
  remote_friendly: {
    type: Boolean,
    default: false,
  },
  beginner_friendly: {
    type: Boolean,
    default: false,
  },
  work_style_tags: {
    type: [String],
    default: [],
    // e.g., ['desk_work', 'independent', 'technical', 'creative']
  },
  typical_tasks: {
    type: [String],
    default: [],
  },
  recommended_tools: {
    type: [String],
    default: [],
  },
  entry_path: {
    type: String,
    default: '',
  },
  growth_path: {
    type: String,
    default: '',
  },
  future_opportunities: {
    type: String,
    default: '',
  },
  related_careers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  }],
  published: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

careerSchema.index({ slug: 1 });
careerSchema.index({ category: 1 });
careerSchema.index({ published: 1 });
careerSchema.index({ beginner_friendly: 1 });
careerSchema.index({ growth_outlook: 1 });
careerSchema.index({ title: 'text', short_description: 'text', category: 'text' });

const Career = mongoose.model('Career', careerSchema);

export default Career;
