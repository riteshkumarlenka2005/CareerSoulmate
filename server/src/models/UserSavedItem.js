import mongoose from 'mongoose';

const userSavedItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item_type: {
    type: String,
    enum: ['career', 'roadmap', 'skill', 'recommendation'],
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'item_type_model',
  },
  item_type_model: {
    type: String,
    enum: ['Career', 'Roadmap', 'Skill', 'Recommendation'],
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

userSavedItemSchema.index({ user: 1, item_type: 1 });
userSavedItemSchema.index({ user: 1, item_id: 1 }, { unique: true });

const UserSavedItem = mongoose.model('UserSavedItem', userSavedItemSchema);

export default UserSavedItem;
