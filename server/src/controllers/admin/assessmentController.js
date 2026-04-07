import Assessment from '../../models/Assessment.js';
import AssessmentQuestion from '../../models/AssessmentQuestion.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';

// ─── Assessments ───────────────────────────────────
export const listAssessments = catchAsync(async (req, res) => {
  const assessments = await Assessment.find().sort({ type: 1, createdAt: -1 });
  ApiResponse.success(res, 'Assessments retrieved', { assessments });
});

export const createAssessment = catchAsync(async (req, res) => {
  const assessment = await Assessment.create(req.body);
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'create', entity_type: 'assessment', entity_id: assessment._id, description: `Created assessment: ${assessment.title}` });
  ApiResponse.created(res, 'Assessment created', { assessment });
});

export const updateAssessment = catchAsync(async (req, res) => {
  const assessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!assessment) throw new NotFoundError('Assessment not found');
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'update', entity_type: 'assessment', entity_id: assessment._id, description: `Updated assessment: ${assessment.title}` });
  ApiResponse.success(res, 'Assessment updated', { assessment });
});

export const deleteAssessment = catchAsync(async (req, res) => {
  const assessment = await Assessment.findByIdAndDelete(req.params.id);
  if (!assessment) throw new NotFoundError('Assessment not found');
  await AssessmentQuestion.deleteMany({ assessment: req.params.id });
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'delete', entity_type: 'assessment', entity_id: req.params.id, description: `Deleted assessment: ${assessment.title}` });
  ApiResponse.success(res, 'Assessment deleted');
});

// ─── Questions ──────────────────────────────────────
export const listQuestions = catchAsync(async (req, res) => {
  const { assessmentId } = req.query;
  const filter = {};
  if (assessmentId) filter.assessment = assessmentId;
  const questions = await AssessmentQuestion.find(filter).populate('assessment', 'title type').sort({ assessment: 1, order_no: 1 });
  ApiResponse.success(res, 'Questions retrieved', { questions });
});

export const createQuestion = catchAsync(async (req, res) => {
  const question = await AssessmentQuestion.create(req.body);
  // Update question count
  const count = await AssessmentQuestion.countDocuments({ assessment: question.assessment, is_active: true });
  await Assessment.findByIdAndUpdate(question.assessment, { total_questions: count });
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'create', entity_type: 'question', entity_id: question._id, description: `Created question for assessment` });
  ApiResponse.created(res, 'Question created', { question });
});

export const updateQuestion = catchAsync(async (req, res) => {
  const question = await AssessmentQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!question) throw new NotFoundError('Question not found');
  ApiResponse.success(res, 'Question updated', { question });
});

export const deleteQuestion = catchAsync(async (req, res) => {
  const question = await AssessmentQuestion.findByIdAndDelete(req.params.id);
  if (!question) throw new NotFoundError('Question not found');
  const count = await AssessmentQuestion.countDocuments({ assessment: question.assessment, is_active: true });
  await Assessment.findByIdAndUpdate(question.assessment, { total_questions: count });
  ApiResponse.success(res, 'Question deleted');
});
