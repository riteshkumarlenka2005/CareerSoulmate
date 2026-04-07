import mongoose from 'mongoose';

const sourceSyncLogSchema = new mongoose.Schema({
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataSource',
    required: true
  },
  started_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  ended_at: {
    type: Date
  },
  status: {
    type: String,
    enum: ['running', 'success', 'failed', 'partial'],
    default: 'running'
  },
  records_fetched: {
    type: Number,
    default: 0
  },
  records_inserted: {
    type: Number,
    default: 0
  },
  records_updated: {
    type: Number,
    default: 0
  },
  error_message: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('SourceSyncLog', sourceSyncLogSchema);
