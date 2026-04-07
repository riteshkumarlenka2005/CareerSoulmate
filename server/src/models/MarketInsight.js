import mongoose from 'mongoose';

const marketInsightSchema = new mongoose.Schema({
  career_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true,
    index: true // Easy to search by career
  },
  demand_score: {
    type: Number, // 0 to 100
    min: 0,
    max: 100
  },
  trend_direction: {
    type: String,
    enum: ['rising', 'stable', 'falling'],
    default: 'stable'
  },
  salary_min: {
    type: Number
  },
  salary_max: {
    type: Number
  },
  top_skills: [{
    type: String
  }],
  related_news_articles: [{
    title: String,
    url: String,
    published_at: Date,
    source: String
  }],
  source_name: {
    type: String, // Which API/Import provided this insight mostly
    default: 'system'
  },
  fetched_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('MarketInsight', marketInsightSchema);
