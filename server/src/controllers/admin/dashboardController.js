import User from '../../models/User.js';
import UserAssessmentAttempt from '../../models/UserAssessmentAttempt.js';
import Career from '../../models/Career.js';
import Recommendation from '../../models/Recommendation.js';
import Roadmap from '../../models/Roadmap.js';
import ChatbotMessage from '../../models/ChatbotMessage.js';
import Notification from '../../models/Notification.js';
import SystemSetting from '../../models/SystemSetting.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';

export const getDashboard = catchAsync(async (req, res) => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers, activeUsers, newUsersThisMonth,
    completedAssessments, totalCareers, totalRoadmaps,
    chatMessages, recentRegistrations, topCareers,
    recentLogs
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ account_status: 'active' }),
    User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    UserAssessmentAttempt.countDocuments({ status: 'completed' }),
    Career.countDocuments({ published: true }),
    Roadmap.countDocuments({ is_active: true }),
    ChatbotMessage.countDocuments(),
    User.find().sort({ createdAt: -1 }).limit(5).select('fullName email createdAt role'),
    Recommendation.aggregate([
      { $group: { _id: '$career', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'careers', localField: '_id', foreignField: '_id', as: 'career' } },
      { $unwind: '$career' },
      { $project: { title: '$career.title', category: '$career.category', count: 1 } },
    ]),
    AdminActivityLog.find().populate('admin_user', 'fullName email').sort({ createdAt: -1 }).limit(10),
  ]);

  // User growth (last 7 days)
  const userGrowth = await User.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  ApiResponse.success(res, 'Admin dashboard', {
    stats: {
      totalUsers, activeUsers, newUsersThisMonth,
      completedAssessments, totalCareers, totalRoadmaps, chatMessages,
    },
    recentRegistrations,
    topCareers,
    userGrowth,
    recentLogs,
  });
});

// Settings
export const getSettings = catchAsync(async (req, res) => {
  const settings = await SystemSetting.find().sort({ category: 1, key: 1 });
  ApiResponse.success(res, 'Settings retrieved', { settings });
});

export const updateSetting = catchAsync(async (req, res) => {
  const { key, value, description, category } = req.body;
  const setting = await SystemSetting.findOneAndUpdate(
    { key },
    { value, description, category },
    { new: true, upsert: true }
  );
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'settings_change', entity_type: 'setting', description: `Updated setting: ${key}` });
  ApiResponse.success(res, 'Setting updated', { setting });
});

// Notification broadcast
export const broadcastNotification = catchAsync(async (req, res) => {
  const { title, message, type = 'admin', action_url } = req.body;
  const users = await User.find({ account_status: 'active' }).select('_id');
  const notifications = users.map(u => ({
    user: u._id, type, title, message, action_url: action_url || '',
  }));
  await Notification.insertMany(notifications);
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'broadcast', entity_type: 'notification', description: `Broadcast to ${users.length} users: ${title}` });
  ApiResponse.success(res, `Notification sent to ${users.length} users`);
});

// Activity logs
export const getLogs = catchAsync(async (req, res) => {
  const { page = 1, limit = 30 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const [logs, total] = await Promise.all([
    AdminActivityLog.find().populate('admin_user', 'fullName email').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    AdminActivityLog.countDocuments(),
  ]);
  ApiResponse.paginated(res, 'Logs retrieved', logs, { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) });
});
