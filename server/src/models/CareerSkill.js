import mongoose from 'mongoose';

const careerSkillSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true,
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  importance_level: {
    type: String,
    enum: ['essential', 'important', 'nice_to_have'],
    default: 'important',
  },
  minimum_required_level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
}, {
  timestamps: true,
});

careerSkillSchema.index({ career: 1 });
careerSkillSchema.index({ skill: 1 });
careerSkillSchema.index({ career: 1, skill: 1 }, { unique: true });

const CareerSkill = mongoose.model('CareerSkill', careerSkillSchema);

export default CareerSkill;
