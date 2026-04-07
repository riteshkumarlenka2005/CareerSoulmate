import RecommendationService from '../services/recommendationService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const generate = catchAsync(async (req, res) => {
  const recommendations = await RecommendationService.generate(req.user._id);
  ApiResponse.success(res, `Generated ${recommendations.length} recommendations`, { recommendations });
});

export const getLatest = catchAsync(async (req, res) => {
  const recommendations = await RecommendationService.getLatest(req.user._id);
  ApiResponse.success(res, 'Latest recommendations retrieved', { recommendations });
});

export const getHistory = catchAsync(async (req, res) => {
  const batches = await RecommendationService.getHistory(req.user._id);
  ApiResponse.success(res, 'Recommendation history retrieved', { batches });
});
