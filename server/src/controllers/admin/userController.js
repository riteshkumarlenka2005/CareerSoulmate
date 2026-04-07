import User from '../../models/User.js';
import UserProfile from '../../models/UserProfile.js';
import UserAssessmentAttempt from '../../models/UserAssessmentAttempt.js';
import Recommendation from '../../models/Recommendation.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';

export const listUsers = catchAsync(async (req, res) => {
  const { page = 1, limit = 20, search, status, role } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) filter.account_status = status;
  if (role) filter.role = role;

  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).select('-password_hash -resetPasswordToken -resetPasswordExpires').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);
  ApiResponse.paginated(res, 'Users retrieved', users, { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) });
});

export const getUserDetail = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password_hash -resetPasswordToken -resetPasswordExpires');
  if (!user) throw new NotFoundError('User not found');

  const [profile, attempts, recs] = await Promise.all([
    UserProfile.findOne({ user: user._id }),
    UserAssessmentAttempt.find({ user: user._id }).populate('assessment', 'title type').sort({ createdAt: -1 }).limit(10),
    Recommendation.find({ user: user._id }).populate('career', 'title').sort({ createdAt: -1 }).limit(10),
  ]);

  ApiResponse.success(res, 'User detail retrieved', { user, profile, attempts, recommendations: recs });
});

export const updateUserStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { account_status: status }, { new: true }).select('-password_hash');
  if (!user) throw new NotFoundError('User not found');
  await AdminActivityLog.create({ admin_user: req.user._id, action: status === 'blocked' ? 'block_user' : 'update', entity_type: 'user', entity_id: user._id, description: `Changed user status to ${status}: ${user.email}` });
  ApiResponse.success(res, `User status updated to ${status}`, { user });
});

export const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new NotFoundError('User not found');
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'delete', entity_type: 'user', entity_id: req.params.id, description: `Deleted user: ${user.email}` });
  ApiResponse.success(res, 'User deleted');
});
