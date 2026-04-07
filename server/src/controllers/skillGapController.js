import SkillGapService from '../services/skillGapService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const analyze = catchAsync(async (req, res) => {
  const { careerId } = req.body;
  const result = await SkillGapService.analyze(req.user._id, careerId);
  ApiResponse.success(res, 'Skill gap analysis complete', result);
});

export const getHistory = catchAsync(async (req, res) => {
  const reports = await SkillGapService.getHistory(req.user._id);
  ApiResponse.success(res, 'Skill gap history retrieved', { reports });
});
