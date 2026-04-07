import Roadmap from '../../models/Roadmap.js';
import RoadmapStep from '../../models/RoadmapStep.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';

export const listRoadmaps = catchAsync(async (req, res) => {
  const roadmaps = await Roadmap.find().populate('career', 'title slug category').sort({ createdAt: -1 });
  ApiResponse.success(res, 'Roadmaps retrieved', { roadmaps });
});

export const createRoadmap = catchAsync(async (req, res) => {
  const roadmap = await Roadmap.create(req.body);
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'create', entity_type: 'roadmap', entity_id: roadmap._id, description: `Created roadmap: ${roadmap.title}` });
  ApiResponse.created(res, 'Roadmap created', { roadmap });
});

export const updateRoadmap = catchAsync(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!roadmap) throw new NotFoundError('Roadmap not found');
  ApiResponse.success(res, 'Roadmap updated', { roadmap });
});

export const deleteRoadmap = catchAsync(async (req, res) => {
  await Roadmap.findByIdAndDelete(req.params.id);
  await RoadmapStep.deleteMany({ roadmap: req.params.id });
  ApiResponse.success(res, 'Roadmap deleted');
});

// Steps
export const listSteps = catchAsync(async (req, res) => {
  const steps = await RoadmapStep.find({ roadmap: req.params.roadmapId }).sort({ step_no: 1 });
  ApiResponse.success(res, 'Steps retrieved', { steps });
});

export const createStep = catchAsync(async (req, res) => {
  const step = await RoadmapStep.create(req.body);
  ApiResponse.created(res, 'Step created', { step });
});

export const updateStep = catchAsync(async (req, res) => {
  const step = await RoadmapStep.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!step) throw new NotFoundError('Step not found');
  ApiResponse.success(res, 'Step updated', { step });
});

export const deleteStep = catchAsync(async (req, res) => {
  await RoadmapStep.findByIdAndDelete(req.params.id);
  ApiResponse.success(res, 'Step deleted');
});
