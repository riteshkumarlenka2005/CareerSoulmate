import Joi from 'joi';

export const submitAnswersSchema = Joi.object({
  answers: Joi.array().items(
    Joi.object({
      questionId: Joi.string().required(),
      value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    })
  ).min(1).required(),
});

export const careerQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().allow('').optional(),
  category: Joi.string().allow('').optional(),
  education: Joi.string().valid('class10', 'class12', 'undergraduate', 'postgraduate', 'any', 'none', '').optional(),
  growth: Joi.string().valid('high', 'medium', 'low', 'very_high', '').optional(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert', '').optional(),
  remote: Joi.string().valid('true', 'false', '').optional(),
  beginner: Joi.string().valid('true', 'false', '').optional(),
  sort: Joi.string().valid('title', 'salary', 'growth', 'newest', '').optional(),
});

export const generateRecommendationsSchema = Joi.object({
  force: Joi.boolean().optional(),
});

export const skillGapSchema = Joi.object({
  careerId: Joi.string().required()
    .messages({ 'any.required': 'Career ID is required' }),
});

export const savedItemSchema = Joi.object({
  item_type: Joi.string().valid('career', 'roadmap', 'skill', 'recommendation').required(),
  item_id: Joi.string().required(),
  notes: Joi.string().allow('').optional(),
});

export const chatMessageSchema = Joi.object({
  message: Joi.string().min(1).max(2000).required(),
  conversationId: Joi.string().allow(null, '').optional(),
});

// Admin validators
export const createAssessmentSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().allow('').optional(),
  type: Joi.string().valid('interest', 'aptitude', 'personality', 'skills', 'preference', 'background').required(),
  estimated_time_minutes: Joi.number().integer().min(1).max(180).optional(),
  is_active: Joi.boolean().optional(),
});

export const createQuestionSchema = Joi.object({
  assessment: Joi.string().required(),
  question_text: Joi.string().min(5).required(),
  question_type: Joi.string().valid('single_choice', 'multiple_choice', 'scale', 'yes_no').required(),
  category: Joi.string().required(),
  subcategory: Joi.string().allow('').optional(),
  options: Joi.array().items(Joi.object({
    label: Joi.string().required(),
    value: Joi.string().required(),
    score: Joi.number().default(0),
  })).min(2).required(),
  weight: Joi.number().min(0).max(10).optional(),
  order_no: Joi.number().integer().min(0).optional(),
  is_active: Joi.boolean().optional(),
  explanation: Joi.string().allow('').optional(),
});

export const createCareerSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),
  category: Joi.string().trim().required(),
  short_description: Joi.string().allow('').optional(),
  full_description: Joi.string().allow('').optional(),
  suitable_for: Joi.array().items(Joi.string()).optional(),
  suitable_interests: Joi.array().items(Joi.string()).optional(),
  required_education: Joi.string().valid('class10', 'class12', 'undergraduate', 'postgraduate', 'any', 'none').optional(),
  salary_range: Joi.object({
    min: Joi.number().min(0).optional(),
    max: Joi.number().min(0).optional(),
    currency: Joi.string().default('INR'),
  }).optional(),
  growth_outlook: Joi.string().valid('high', 'medium', 'low', 'very_high').optional(),
  difficulty_level: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
  remote_friendly: Joi.boolean().optional(),
  beginner_friendly: Joi.boolean().optional(),
  work_style_tags: Joi.array().items(Joi.string()).optional(),
  typical_tasks: Joi.array().items(Joi.string()).optional(),
  recommended_tools: Joi.array().items(Joi.string()).optional(),
  entry_path: Joi.string().allow('').optional(),
  growth_path: Joi.string().allow('').optional(),
  future_opportunities: Joi.string().allow('').optional(),
  published: Joi.boolean().optional(),
});

export const createSkillSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  category: Joi.string().trim().required(),
  description: Joi.string().allow('').optional(),
  difficulty_level: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
});

export const createRoadmapSchema = Joi.object({
  career: Joi.string().required(),
  title: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().allow('').optional(),
  estimated_duration: Joi.string().allow('').optional(),
  difficulty_level: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
  is_active: Joi.boolean().optional(),
});

export const createRoadmapStepSchema = Joi.object({
  roadmap: Joi.string().required(),
  step_no: Joi.number().integer().min(1).required(),
  title: Joi.string().trim().required(),
  description: Joi.string().allow('').optional(),
  resource_links: Joi.array().items(Joi.object({
    title: Joi.string().allow('').optional(),
    url: Joi.string().allow('').optional(),
    type: Joi.string().valid('video', 'article', 'course', 'tool', 'other').optional(),
  })).optional(),
  duration_estimate: Joi.string().allow('').optional(),
  skills_covered: Joi.array().items(Joi.string()).optional(),
});

export const createFAQSchema = Joi.object({
  question: Joi.string().min(5).required(),
  answer: Joi.string().min(5).required(),
  category: Joi.string().allow('').optional(),
  order: Joi.number().integer().min(0).optional(),
  is_active: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

export const broadcastNotificationSchema = Joi.object({
  title: Joi.string().min(2).required(),
  message: Joi.string().min(5).required(),
  type: Joi.string().valid('system', 'reminder', 'recommendation', 'achievement', 'admin', 'assessment').optional(),
  action_url: Joi.string().allow('').optional(),
});

export const systemSettingSchema = Joi.object({
  key: Joi.string().required(),
  value: Joi.any().required(),
  description: Joi.string().allow('').optional(),
  category: Joi.string().allow('').optional(),
});
