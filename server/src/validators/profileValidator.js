import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).optional(),
  phone: Joi.string().allow('').optional(),
  preferred_language: Joi.string().max(5).optional(),
  education: Joi.object({
    level: Joi.string().valid('class10', 'class12', 'undergraduate', 'postgraduate', 'working', '').optional(),
    stream: Joi.string().allow('').optional(),
    institution: Joi.string().allow('').optional(),
  }).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  // Extended profile fields
  education_level: Joi.string().valid('class10', 'class12', 'undergraduate', 'postgraduate', 'working', 'other', '').optional(),
  stream: Joi.string().allow('').optional(),
  occupation_status: Joi.string().valid('school_student', 'college_student', 'graduate', 'job_seeker', 'working_professional', 'other', '').optional(),
  city: Joi.string().allow('').optional(),
  state: Joi.string().allow('').optional(),
  date_of_birth: Joi.date().allow(null).optional(),
  gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say', '').optional(),
  interests_text: Joi.string().allow('').optional(),
  known_skills: Joi.array().items(Joi.string()).optional(),
  known_skills_ratings: Joi.object().pattern(Joi.string(), Joi.number().min(0).max(10)).optional(),
  work_preference: Joi.string().valid('office', 'remote', 'hybrid', 'field', 'freelance', '').optional(),
  preferred_industries: Joi.array().items(Joi.string()).optional(),
  preferred_work_style: Joi.string().valid('independent', 'team', 'both', '').optional(),
  career_preference: Joi.string().valid('job', 'business', 'freelance', 'government', 'any', '').optional(),
  bio: Joi.string().allow('').max(500).optional(),
  target_career: Joi.string().allow(null, '').optional(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required()
    .messages({ 'any.required': 'Current password is required' }),
  newPassword: Joi.string().min(8).max(128).required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'New password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'New password is required',
    }),
});
