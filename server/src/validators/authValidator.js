import Joi from 'joi';

// ─── Registration ───────────────────────────────────────
export const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.min': 'Full name must be at least 2 characters',
      'string.max': 'Full name must be less than 100 characters',
      'any.required': 'Full name is required',
    }),
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).max(128).required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required',
    }),
  phone: Joi.string().allow('').optional(),
  education_level: Joi.string().valid('class10', 'class12', 'undergraduate', 'postgraduate', 'working', 'other', '').optional(),
  current_status: Joi.string().valid('school_student', 'college_student', 'graduate', 'job_seeker', 'working_professional', 'other', '').optional(),
  preferred_language: Joi.string().max(5).optional(),
});

// ─── Login ──────────────────────────────────────────────
export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required',
    }),
});

// ─── Forgot Password ───────────────────────────────────
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
});

// ─── Reset Password ────────────────────────────────────
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required()
    .messages({ 'any.required': 'Reset token is required' }),
  password: Joi.string().min(8).max(128).required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'New password is required',
    }),
});

// ─── Update Profile ────────────────────────────────────
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
});

// ─── Change Password ───────────────────────────────────
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
