import FAQ from '../../models/FAQ.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';

export const listFAQs = catchAsync(async (req, res) => {
  const faqs = await FAQ.find().sort({ category: 1, order: 1 });
  ApiResponse.success(res, 'FAQs retrieved', { faqs });
});

export const createFAQ = catchAsync(async (req, res) => {
  const faq = await FAQ.create(req.body);
  ApiResponse.created(res, 'FAQ created', { faq });
});

export const updateFAQ = catchAsync(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!faq) throw new NotFoundError('FAQ not found');
  ApiResponse.success(res, 'FAQ updated', { faq });
});

export const deleteFAQ = catchAsync(async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  ApiResponse.success(res, 'FAQ deleted');
});

// Public endpoint
export const getPublicFAQs = catchAsync(async (req, res) => {
  const faqs = await FAQ.find({ is_active: true }).sort({ category: 1, order: 1 });
  ApiResponse.success(res, 'FAQs retrieved', { faqs });
});
