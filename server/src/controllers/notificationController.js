import Notification from '../models/Notification.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const listNotifications = catchAsync(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Notification.countDocuments({ user: req.user._id }),
    Notification.countDocuments({ user: req.user._id, is_read: false }),
  ]);

  ApiResponse.paginated(res, 'Notifications retrieved', notifications, {
    page: Number(page), limit: Number(limit), total,
    totalPages: Math.ceil(total / Number(limit)),
    unreadCount,
  });
});

export const markAsRead = catchAsync(async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { is_read: true }
  );
  ApiResponse.success(res, 'Notification marked as read');
});

export const markAllAsRead = catchAsync(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, is_read: false }, { is_read: true });
  ApiResponse.success(res, 'All notifications marked as read');
});

export const deleteNotification = catchAsync(async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  ApiResponse.success(res, 'Notification deleted');
});
