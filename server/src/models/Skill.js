import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    // e.g., 'technical', 'soft_skill', 'tool', 'language', 'domain'
  },
  description: {
    type: String,
    default: '',
  },
  difficulty_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
}, {
  timestamps: true,
});

skillSchema.index({ category: 1 });
skillSchema.index({ name: 'text' });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
