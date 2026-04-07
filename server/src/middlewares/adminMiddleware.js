import { ForbiddenError } from '../utils/ApiError.js';

/**
 * Middleware to check if the authenticated user has admin role.
 * Must be used AFTER authenticateToken middleware.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ForbiddenError('Authentication required'));
  }

  if (req.user.role !== 'admin') {
    return next(new ForbiddenError('Admin access required'));
  }

  next();
};

export default requireAdmin;
