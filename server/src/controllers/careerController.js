import Career from '../models/Career.js';
import CareerSkill from '../models/CareerSkill.js';
import Skill from '../models/Skill.js';
import Roadmap from '../models/Roadmap.js';
import RoadmapStep from '../models/RoadmapStep.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { NotFoundError } from '../utils/ApiError.js';

/**
 * GET /api/careers — List careers (paginated, filterable)
 */
export const listCareers = catchAsync(async (req, res) => {
  const {
    page = 1, limit = 20, search, category,
    education, growth, difficulty, remote, beginner, sort,
  } = req.query;

  const filter = { published: true };

  if (search) {
    filter.$text = { $search: search };
  }
  if (category) filter.category = category;
  if (education) filter.required_education = education;
  if (growth) filter.growth_outlook = growth;
  if (difficulty) filter.difficulty_level = difficulty;
  if (remote === 'true') filter.remote_friendly = true;
  if (beginner === 'true') filter.beginner_friendly = true;

  let sortObj = { title: 1 };
  if (sort === 'salary') sortObj = { 'salary_range.max': -1 };
  else if (sort === 'growth') sortObj = { growth_outlook: -1 };
  else if (sort === 'newest') sortObj = { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);
  const [careers, total] = await Promise.all([
    Career.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
    Career.countDocuments(filter),
  ]);

  ApiResponse.paginated(res, 'Careers retrieved', careers, {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit)),
  });
});

/**
 * GET /api/careers/categories — Get unique categories
 */
export const getCategories = catchAsync(async (req, res) => {
  const categories = await Career.distinct('category', { published: true });
  ApiResponse.success(res, 'Categories retrieved', { categories: categories.sort() });
});

/**
 * GET /api/careers/:slug — Career detail by slug
 */
export const getCareerBySlug = catchAsync(async (req, res) => {
  const career = await Career.findOne({ slug: req.params.slug, published: true })
    .populate('related_careers', 'title slug category short_description');

  if (!career) throw new NotFoundError('Career not found');

  // Get skills for this career
  const careerSkills = await CareerSkill.find({ career: career._id })
    .populate('skill', 'name category description difficulty_level');

  ApiResponse.success(res, 'Career retrieved', {
    career,
    skills: careerSkills,
  });
});

/**
 * GET /api/careers/:id/skills — Career's required skills
 */
export const getCareerSkills = catchAsync(async (req, res) => {
  const careerSkills = await CareerSkill.find({ career: req.params.id })
    .populate('skill', 'name category description difficulty_level');

  ApiResponse.success(res, 'Career skills retrieved', { skills: careerSkills });
});

/**
 * GET /api/careers/:id/roadmap — Career's roadmap + steps
 */
export const getCareerRoadmap = catchAsync(async (req, res) => {
  const roadmap = await Roadmap.findOne({ career: req.params.id, is_active: true });
  if (!roadmap) {
    return ApiResponse.success(res, 'No roadmap available', { roadmap: null, steps: [] });
  }

  const steps = await RoadmapStep.find({ roadmap: roadmap._id })
    .populate('skills_covered', 'name category')
    .sort({ step_no: 1 });

  ApiResponse.success(res, 'Roadmap retrieved', { roadmap, steps });
});
