import AssessmentService from '../services/assessmentService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/assessments — List active assessments
 */
export const listAssessments = catchAsync(async (req, res) => {
  const assessments = await AssessmentService.listAssessments();
  ApiResponse.success(res, 'Assessments retrieved', { assessments });
});

/**
 * GET /api/assessments/:id — Get assessment with questions
 */
export const getAssessment = catchAsync(async (req, res) => {
  const { assessment, questions } = await AssessmentService.getAssessmentWithQuestions(req.params.id);
  ApiResponse.success(res, 'Assessment retrieved', { assessment, questions });
});

/**
 * POST /api/assessments/:id/start — Start an attempt
 */
export const startAttempt = catchAsync(async (req, res) => {
  const result = await AssessmentService.startAttempt(req.user._id, req.params.id);
  const message = result.resumed ? 'Resumed existing attempt' : 'Assessment started';
  ApiResponse.success(res, message, result);
});

/**
 * POST /api/assessments/attempts/:attemptId/submit — Submit answers
 */
export const submitAttempt = catchAsync(async (req, res) => {
  const { answers } = req.body; // [{ questionId, value }]
  const attempt = await AssessmentService.submitAttempt(req.user._id, req.params.attemptId, answers);
  ApiResponse.success(res, 'Assessment submitted successfully', { attempt });
});

/**
 * GET /api/assessments/attempts — User's attempt history
 */
export const getAttempts = catchAsync(async (req, res) => {
  const attempts = await AssessmentService.getUserAttempts(req.user._id);
  ApiResponse.success(res, 'Attempts retrieved', { attempts });
});

/**
 * GET /api/assessments/attempts/:attemptId — Single attempt result
 */
export const getAttemptResult = catchAsync(async (req, res) => {
  const result = await AssessmentService.getAttemptResult(req.user._id, req.params.attemptId);
  ApiResponse.success(res, 'Attempt result retrieved', result);
});
