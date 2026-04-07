import express from 'express';
import passport from 'passport';
import AuthService from '../services/authService.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/authValidator.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// ─── Public Auth Routes ─────────────────────────────────

// POST /api/auth/register — Email/password registration
router.post('/register', validate(registerSchema), authController.register);

// POST /api/auth/login — Email/password login
router.post('/login', validate(loginSchema), authController.login);

// POST /api/auth/forgot-password
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// ─── Google OAuth ───────────────────────────────────────

// GET /api/auth/google — Initiate Google login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}));

// GET /api/auth/google/callback — Handle Google callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}?auth=error`,
    session: false,
  }),
  (req, res) => {
    const token = AuthService.generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}?token=${token}`);
  }
);

// ─── Protected Routes ───────────────────────────────────

// GET /api/auth/me — Get current user
router.get('/me', authenticateToken, authController.getMe);

// PUT /api/auth/profile — Update user profile
router.put('/profile', authenticateToken, validate(updateProfileSchema), async (req, res, next) => {
  try {
    const allowedUpdates = ['fullName', 'phone', 'preferred_language', 'education', 'interests'];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const User = (await import('../models/User.js')).default;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    const { default: ApiResponse } = await import('../utils/ApiResponse.js');
    ApiResponse.success(res, 'Profile updated', { user: AuthService.formatUser(user) });
  } catch (error) {
    next(error);
  }
});

// PUT /api/auth/change-password
router.put('/change-password', authenticateToken, validate(changePasswordSchema), async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await AuthService.changePassword(req.user._id, currentPassword, newPassword);

    const { default: ApiResponse } = await import('../utils/ApiResponse.js');
    ApiResponse.success(res, result.message);
  } catch (error) {
    next(error);
  }
});

export default router;
