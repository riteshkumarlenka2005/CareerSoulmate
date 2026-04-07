import AuthService from '../services/authService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * POST /api/auth/register
 */
export const register = catchAsync(async (req, res) => {
  const { user, token } = await AuthService.register(req.body);

  ApiResponse.created(res, 'Registration successful', {
    user: AuthService.formatUser(user),
    token,
  });
});

/**
 * POST /api/auth/login
 */
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);

  ApiResponse.success(res, 'Login successful', {
    user: AuthService.formatUser(user),
    token,
  });
});

/**
 * POST /api/auth/forgot-password
 */
export const forgotPassword = catchAsync(async (req, res) => {
  const result = await AuthService.forgotPassword(req.body.email);

  ApiResponse.success(res, result.message, {
    _dev_reset_token: result._dev_reset_token, // Remove in production
  });
});

/**
 * POST /api/auth/reset-password
 */
export const resetPassword = catchAsync(async (req, res) => {
  const { token, password } = req.body;
  const result = await AuthService.resetPassword(token, password);

  ApiResponse.success(res, result.message);
});

/**
 * GET /api/auth/me
 */
export const getMe = catchAsync(async (req, res) => {
  ApiResponse.success(res, 'User retrieved', {
    user: AuthService.formatUser(req.user),
  });
});

/**
 * POST /api/auth/logout
 */
export const logout = catchAsync(async (req, res) => {
  ApiResponse.success(res, 'Logged out successfully');
});
