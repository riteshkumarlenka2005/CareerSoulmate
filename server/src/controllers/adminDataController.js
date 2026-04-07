import ImportStaging from '../models/ImportStaging.js';
import DataSource from '../models/DataSource.js';
import Career from '../models/Career.js';
import { runMarketDataSync } from '../services/cronJobs.js';

// Get all staging records
export const getStagingRecords = async (req, res) => {
  try {
    const records = await ImportStaging.find()
      .populate('source_id', 'name type')
      .populate('matched_career_id', 'title category')
      .sort({ createdAt: -1 });
      
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload JSON/CSV to Staging manually
export const uploadManualData = async (req, res) => {
  try {
    const { payload, sourceName } = req.body;
    
    if (!Array.isArray(payload)) {
       return res.status(400).json({ success: false, message: 'Payload must be an array of objects.' });
    }

    let source = await DataSource.findOne({ name: sourceName });
    if (!source) {
      source = await DataSource.create({
        name: sourceName || 'Manual CSV Upload',
        type: 'csv',
        sync_frequency: 'manual'
      });
    }

    const inserted = [];
    for (const item of payload) {
      // Basic normalization logic based on expected CSV headers
      const title = item.title || item.Role || item.Name;
      let existingCareer = null;
      let matchStatus = 'new';
      
      if (title) {
        existingCareer = await Career.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
        if (existingCareer) matchStatus = 'update';
      }

      const stagingRecord = new ImportStaging({
        source_id: source._id,
        raw_payload: item,
        normalized_payload: {
           title: title,
           description: item.description || item.Description || '',
           category: item.category || item.Industry || 'Uncategorized',
           salary_min: item.salary_min || item.MinSalary || 0,
           salary_max: item.salary_max || item.MaxSalary || 0
        },
        match_status: matchStatus,
        matched_career_id: existingCareer ? existingCareer._id : null,
      });
      await stagingRecord.save();
      inserted.push(stagingRecord);
    }

    res.status(201).json({ success: true, message: `Successfully staged ${inserted.length} records.`, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve or Reject Staging Records
export const processApproval = async (req, res) => {
   try {
     const { recordIds, action } = req.body; // action = 'approve' or 'reject'
     
     if (!recordIds || !Array.isArray(recordIds)) {
       return res.status(400).json({ success: false, message: 'Provide array of recordIds' });
     }

     const records = await ImportStaging.find({ _id: { $in: recordIds } });
     
     for (const record of records) {
        if (action === 'reject') {
           record.review_status = 'rejected';
           await record.save();
           continue;
        }

        // Approval Logic
        const payload = record.normalized_payload;
        if (record.match_status === 'update' && record.matched_career_id) {
           // Update existing career market insights directly
           // (For demo, we just update the description logic or similar)
        } else if (record.match_status === 'new') {
           const newCareer = new Career({
              title: payload.title,
              slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              category: payload.category,
              short_description: payload.description.substring(0, 100),
              full_description: payload.description
           });
           await newCareer.save();
           record.matched_career_id = newCareer._id;
           record.match_status = 'update'; // Transitioned
        }
        
        record.review_status = 'approved';
        await record.save();
     }

     res.json({ success: true, message: `Processed ${records.length} records logic.` });
   } catch(error) {
     res.status(500).json({ success: false, message: error.message });
   }
};

export const getDataSources = async (req, res) => {
  try {
     const sources = await DataSource.find().sort({ createdAt: -1 });
     res.json({ success: true, data: sources });
  } catch (error) {
     res.status(500).json({ success: false, message: error.message });
  }
};

// Force Trigger API Scraper
export const forceSyncMarketData = async (req, res) => {
  try {
     res.json({ success: true, message: 'Market data sync started in background. Check Sync Logs for progress.' });
     // Run asynchronously
     runMarketDataSync();
  } catch (error) {
     res.status(500).json({ success: false, message: error.message });
  }
};
