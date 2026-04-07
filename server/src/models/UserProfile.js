import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  education_level: {
    type: String,
    enum: ['class10', 'class12', 'undergraduate', 'postgraduate', 'working', 'other', ''],
    default: '',
  },
  stream: { type: String, default: '' },
  occupation_status: {
    type: String,
    enum: ['school_student', 'college_student', 'graduate', 'job_seeker', 'working_professional', 'other', ''],
    default: '',
  },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  date_of_birth: { type: Date, default: null },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say', ''],
    default: '',
  },
  interests_text: { type: String, default: '' },
  known_skills: {
    type: [String],
    default: [],
  },
  known_skills_ratings: {
    type: Map,
    of: Number,
    default: {},
  },
  work_preference: {
    type: String,
    enum: ['office', 'remote', 'hybrid', 'field', 'freelance', ''],
    default: '',
  },
  preferred_industries: {
    type: [String],
    default: [],
  },
  preferred_work_style: {
    type: String,
    enum: ['independent', 'team', 'both', ''],
    default: '',
  },
  career_preference: {
    type: String,
    enum: ['job', 'business', 'freelance', 'government', 'any', ''],
    default: '',
  },
  bio: { type: String, default: '' },
  profile_completion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  target_career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    default: null,
  },
}, {
  timestamps: true,
});

userProfileSchema.index({ user: 1 });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
