import Career from '../../models/Career.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';
import slugify from 'slugify';

export const listCareers = catchAsync(async (req, res) => {
  const { page = 1, limit = 50, search } = req.query;
  const filter = {};
  if (search) filter.$text = { $search: search };
  const skip = (Number(page) - 1) * Number(limit);
  const [careers, total] = await Promise.all([
    Career.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Career.countDocuments(filter),
  ]);
  ApiResponse.paginated(res, 'Careers retrieved', careers, { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) });
});

export const createCareer = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.title, { lower: true, strict: true });
  const career = await Career.create(data);
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'create', entity_type: 'career', entity_id: career._id, description: `Created career: ${career.title}` });
  ApiResponse.created(res, 'Career created', { career });
});

export const updateCareer = catchAsync(async (req, res) => {
  if (req.body.title && !req.body.slug) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }
  const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!career) throw new NotFoundError('Career not found');
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'update', entity_type: 'career', entity_id: career._id, description: `Updated career: ${career.title}` });
  ApiResponse.success(res, 'Career updated', { career });
});

export const deleteCareer = catchAsync(async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) throw new NotFoundError('Career not found');
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'delete', entity_type: 'career', entity_id: req.params.id, description: `Deleted career: ${career.title}` });
  ApiResponse.success(res, 'Career deleted');
});
