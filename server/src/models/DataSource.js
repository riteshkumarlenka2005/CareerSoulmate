import mongoose from 'mongoose';

const dataSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['api', 'scrape', 'manual', 'csv'],
    required: true
  },
  base_url: {
    type: String,
    trim: true
  },
  api_key_identifier: {
    type: String,
    trim: true,
    description: "Identifier/name of the key stored in env so we don't store raw keys in DB."
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deprecated'],
    default: 'active'
  },
  sync_frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'manual'],
    default: 'manual'
  },
  last_synced_at: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('DataSource', dataSourceSchema);
