import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  password_hash: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  role: {
    type: String,
    enum: ['student', 'user', 'admin'],
    default: 'user',
  },
  account_status: {
    type: String,
    enum: ['active', 'blocked', 'deactivated'],
    default: 'active',
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  preferred_language: {
    type: String,
    default: 'en',
  },
  education: {
    level: {
      type: String,
      enum: ['class10', 'class12', 'undergraduate', 'postgraduate', 'working', ''],
      default: '',
    },
    stream: { type: String, default: '' },
    institution: { type: String, default: '' },
  },
  interests: {
    type: [String],
    default: [],
  },
  completedAssessments: {
    type: [String],
    default: [],
  },
  badges: {
    type: [String],
    default: ['welcome'],
  },
  points: {
    type: Number,
    default: 50,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ account_status: 1 });

const User = mongoose.model('User', userSchema);

export default User;
