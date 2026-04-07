import mongoose from 'mongoose';

const systemSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'general',
    // e.g., 'general', 'recommendation', 'notification', 'branding', 'email'
  },
}, {
  timestamps: true,
});

systemSettingSchema.index({ key: 1 });
systemSettingSchema.index({ category: 1 });

const SystemSetting = mongoose.model('SystemSetting', systemSettingSchema);

export default SystemSetting;
