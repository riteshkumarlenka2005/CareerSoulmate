import Skill from '../../models/Skill.js';
import CareerSkill from '../../models/CareerSkill.js';
import AdminActivityLog from '../../models/AdminActivityLog.js';
import ApiResponse from '../../utils/ApiResponse.js';
import catchAsync from '../../utils/catchAsync.js';
import { NotFoundError } from '../../utils/ApiError.js';

export const listSkills = catchAsync(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;
  const skills = await Skill.find(filter).sort({ category: 1, name: 1 });
  ApiResponse.success(res, 'Skills retrieved', { skills });
});

export const createSkill = catchAsync(async (req, res) => {
  const skill = await Skill.create(req.body);
  await AdminActivityLog.create({ admin_user: req.user._id, action: 'create', entity_type: 'skill', entity_id: skill._id, description: `Created skill: ${skill.name}` });
  ApiResponse.created(res, 'Skill created', { skill });
});

export const updateSkill = catchAsync(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!skill) throw new NotFoundError('Skill not found');
  ApiResponse.success(res, 'Skill updated', { skill });
});

export const deleteSkill = catchAsync(async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  await CareerSkill.deleteMany({ skill: req.params.id });
  ApiResponse.success(res, 'Skill deleted');
});

// Career-Skill mappings
export const getCareerSkills = catchAsync(async (req, res) => {
  const { careerId } = req.query;
  const filter = {};
  if (careerId) filter.career = careerId;
  const mappings = await CareerSkill.find(filter).populate('skill', 'name category').populate('career', 'title');
  ApiResponse.success(res, 'Career-skill mappings retrieved', { mappings });
});

export const addCareerSkill = catchAsync(async (req, res) => {
  const mapping = await CareerSkill.create(req.body);
  ApiResponse.created(res, 'Career-skill mapping created', { mapping });
});

export const removeCareerSkill = catchAsync(async (req, res) => {
  await CareerSkill.findByIdAndDelete(req.params.id);
  ApiResponse.success(res, 'Mapping removed');
});
