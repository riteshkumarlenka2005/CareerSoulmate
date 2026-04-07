import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { updateProfileSchema, changePasswordSchema } from '../validators/profileValidator.js';
import * as profileController from '../controllers/profileController.js';
import AuthService from '../services/authService.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

// GET /api/profile — Get full profile
router.get('/', authenticateToken, profileController.getProfile);

// PUT /api/profile — Update profile
router.put('/', authenticateToken, validate(updateProfileSchema), profileController.updateProfile);

// PUT /api/profile/password — Change password
router.put('/password', authenticateToken, validate(changePasswordSchema), catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await AuthService.changePassword(req.user._id, currentPassword, newPassword);
  ApiResponse.success(res, result.message);
}));

// DELETE /api/profile — Deactivate account
router.delete('/', authenticateToken, profileController.deactivateAccount);

export default router;
