import { ValidationError } from '../utils/ApiError.js';

/**
 * Express middleware factory for Joi validation.
 * Usage: router.post('/path', validate(schema), handler);
 * 
 * @param {import('joi').ObjectSchema} schema - Joi validation schema
 * @param {string} source - Where to validate: 'body', 'query', 'params'
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
      }));
      
      console.error(`🔍 Validation Failed [${req.method} ${req.originalUrl}]:`, JSON.stringify(errors, null, 2));
      
      return next(new ValidationError('Validation failed', errors));
    }

    // Replace request data with validated/sanitized values
    req[source] = value;
    next();
  };
};

export default validate;
