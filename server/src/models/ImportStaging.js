import mongoose from 'mongoose';

const importStagingSchema = new mongoose.Schema({
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataSource',
    required: false // Often it's manually uploaded
  },
  raw_payload: {
    type: mongoose.Schema.Types.Mixed, // Raw untouched JSON/CSV row
    required: true
  },
  normalized_payload: {
    type: mongoose.Schema.Types.Mixed, // After basic transformation into Career schema layout
    required: true
  },
  match_status: {
    type: String,
    enum: ['new', 'update', 'duplicate_conflict'],
    default: 'new'
  },
  matched_career_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career' // If it updates an existing career, this is linked
  },
  review_status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('ImportStaging', importStagingSchema);
