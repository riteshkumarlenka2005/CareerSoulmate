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
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['student', 'college', 'counselor', 'admin'],
    default: 'student',
  },
  education: {
    level: {
      type: String,
      enum: ['class10', 'class12', 'undergraduate', 'postgraduate', 'working'],
    },
    stream: String,
    institution: String,
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
}, {
  timestamps: true,
});

userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
