import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import UserAssessmentAttempt from '../models/UserAssessmentAttempt.js';
import Recommendation from '../models/Recommendation.js';
import UserSavedItem from '../models/UserSavedItem.js';
import Notification from '../models/Notification.js';
import Career from '../models/Career.js';
import MarketInsight from '../models/MarketInsight.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const getDashboard = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const [profile, attempts, savedCount, unreadNotifs, recentNotifs] = await Promise.all([
    UserProfile.findOne({ user: userId }),
    UserAssessmentAttempt.find({ user: userId }).populate('assessment', 'title type').sort({ createdAt: -1 }).limit(5),
    UserSavedItem.countDocuments({ user: userId }),
    Notification.countDocuments({ user: userId, is_read: false }),
    Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(5),
  ]);

  // Get latest recommendations (top 3)
  const latestRec = await Recommendation.findOne({ user: userId }).sort({ createdAt: -1 }).select('batch_id');
  let topRecommendations = [];
  if (latestRec) {
    topRecommendations = await Recommendation.find({ user: userId, batch_id: latestRec.batch_id })
      .populate('career', 'title slug category short_description')
      .sort({ rank: 1 })
      .limit(3)
      .lean();
      
    // Attach Market Insights to recommendations
    for (let r of topRecommendations) {
       if (r.career?._id) {
          const insight = await MarketInsight.findOne({ career_id: r.career._id }).lean();
          if (insight) r.career.market_insight = insight;
       }
    }
  }

  // Fetch Global Trending Careers
  const trendingInsightsRaw = await MarketInsight.find()
      .sort({ demand_score: -1 })
      .limit(3)
      .populate('career_id', 'title slug category short_description')
      .lean();

  const trendingInsights = trendingInsightsRaw.map(insight => {
    insight.career = insight.career_id;
    delete insight.career_id;
    return insight;
  });

  // Assessment status
  const completedTypes = [...new Set(
    attempts.filter(a => a.status === 'completed').map(a => a.assessment?.type).filter(Boolean)
  )];
  const allTypes = ['interest', 'aptitude', 'personality', 'skills', 'preference', 'background'];
  const pendingAssessments = allTypes.filter(t => !completedTypes.includes(t));

  const dashboard = {
    welcome: {
      name: req.user.fullName,
      points: req.user.points || 0,
      badges: req.user.badges || [],
      level: Math.floor((req.user.points || 0) / 100) + 1,
    },
    profile_completion: profile?.profile_completion || 0,
    assessment_status: {
      completed: completedTypes,
      pending: pendingAssessments,
      total_completed: completedTypes.length,
      total: allTypes.length,
    },
    recent_attempts: attempts,
    top_recommendations: topRecommendations,
    saved_count: savedCount,
    notifications: {
      unread_count: unreadNotifs,
      recent: recentNotifs,
    },
    target_career: profile?.target_career || null,
    trending_market: trendingInsights
  };

  ApiResponse.success(res, 'Dashboard data retrieved', dashboard);
});
