import UserSavedItem from '../models/UserSavedItem.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { NotFoundError, ConflictError } from '../utils/ApiError.js';

const MODEL_MAP = {
  career: 'Career',
  roadmap: 'Roadmap',
  skill: 'Skill',
  recommendation: 'Recommendation',
};

export const listSaved = catchAsync(async (req, res) => {
  const { type } = req.query;
  const filter = { user: req.user._id };
  if (type) filter.item_type = type;

  const items = await UserSavedItem.find(filter)
    .populate('item_id')
    .sort({ createdAt: -1 });

  ApiResponse.success(res, 'Saved items retrieved', { items });
});

export const saveItem = catchAsync(async (req, res) => {
  const { item_type, item_id, notes } = req.body;

  // Check for duplicate
  const existing = await UserSavedItem.findOne({ user: req.user._id, item_id });
  if (existing) throw new ConflictError('Item already saved');

  const item = await UserSavedItem.create({
    user: req.user._id,
    item_type,
    item_id,
    item_type_model: MODEL_MAP[item_type] || 'Career',
    notes: notes || '',
  });

  ApiResponse.created(res, 'Item saved', { item });
});

export const removeSaved = catchAsync(async (req, res) => {
  const item = await UserSavedItem.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!item) throw new NotFoundError('Saved item not found');
  ApiResponse.success(res, 'Item removed');
});
