import mongoose from 'mongoose';

const adminActivityLogSchema = new mongoose.Schema({
  admin_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    // e.g., 'create', 'update', 'delete', 'block_user', 'login', 'settings_change'
  },
  entity_type: {
    type: String,
    required: true,
    // e.g., 'career', 'user', 'assessment', 'question', 'skill', 'roadmap', 'faq', 'setting'
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  description: {
    type: String,
    default: '',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  ip_address: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

adminActivityLogSchema.index({ admin_user: 1, createdAt: -1 });
adminActivityLogSchema.index({ entity_type: 1 });
adminActivityLogSchema.index({ action: 1 });

const AdminActivityLog = mongoose.model('AdminActivityLog', adminActivityLogSchema);

export default AdminActivityLog;
