import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import Notification from '../models/Notification.js';
import { ConflictError, AuthenticationError, NotFoundError } from '../utils/ApiError.js';

const SALT_ROUNDS = 12;

class AuthService {
  /**
   * Register a new user with email/password
   */
  static async register({ fullName, email, password, phone, education_level, current_status, preferred_language }) {
    // Check duplicate email
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password_hash,
      phone: phone || '',
      preferred_language: preferred_language || 'en',
      role: 'user',
      account_status: 'active',
      badges: ['welcome'],
      points: 50,
    });

    // Create empty profile
    await UserProfile.create({
      user: user._id,
      education_level: education_level || '',
      occupation_status: current_status || '',
    });

    // Create welcome notification
    await Notification.create({
      user: user._id,
      type: 'system',
      title: 'Welcome to CareerSoulmate!',
      message: 'Start by completing your profile and taking your first career assessment.',
      action_url: '/profile',
    });

    // Generate token
    const token = AuthService.generateToken(user);

    return { user, token };
  }

  /**
   * Login with email/password
   */
  static async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (user.account_status === 'blocked') {
      throw new AuthenticationError('Your account has been suspended. Please contact support.');
    }

    if (user.account_status === 'deactivated') {
      throw new AuthenticationError('Your account has been deactivated.');
    }

    // Check if user has a password (might be Google-only user)
    if (!user.password_hash) {
      throw new AuthenticationError('This account uses Google Sign-In. Please login with Google.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    const token = AuthService.generateToken(user);

    return { user, token };
  }

  /**
   * Generate forgot password token
   */
  static async forgotPassword(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If an account exists with this email, a reset link has been sent.' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // TODO: Send email with reset link when SMTP is configured
    // For now, return the token (in production, this would be sent via email only)
    return {
      message: 'If an account exists with this email, a reset link has been sent.',
      // Remove this in production — only for development:
      _dev_reset_token: resetToken,
    };
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AuthenticationError('Invalid or expired reset token');
    }

    user.password_hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return { message: 'Password reset successful. Please login with your new password.' };
  }

  /**
   * Change password (for logged-in users)
   */
  static async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    if (!user.password_hash) {
      throw new AuthenticationError('This account uses Google Sign-In. You can set a password in your profile settings.');
    }

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      throw new AuthenticationError('Current password is incorrect');
    }

    user.password_hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await user.save();

    return { message: 'Password changed successfully' };
  }

  /**
   * Generate JWT token
   */
  static generateToken(user) {
    return jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  /**
   * Format user for client response
   */
  static formatUser(user) {
    return {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      education: user.education,
      interests: user.interests,
      completedAssessments: user.completedAssessments,
      badges: user.badges,
      points: user.points,
      account_status: user.account_status,
      preferred_language: user.preferred_language,
      email_verified: user.email_verified,
      createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
    };
  }
}

export default AuthService;
