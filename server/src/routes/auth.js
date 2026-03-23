import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Helper: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Helper: Format user for client (match the existing frontend User interface)
const formatUser = (user) => ({
  id: user._id.toString(),
  email: user.email,
  fullName: user.fullName,
  role: user.role,
  avatar: user.avatar,
  education: user.education,
  interests: user.interests,
  completedAssessments: user.completedAssessments,
  badges: user.badges,
  points: user.points,
  createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
});

// ─── Google OAuth ───────────────────────────────────────────

// GET /auth/google — Initiate Google login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}));

// GET /auth/google/callback — Handle Google callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}?auth=error`,
    session: false,
  }),
  (req, res) => {
    // Generate JWT for the authenticated user
    const token = generateToken(req.user);

    // Redirect to client with token as a query parameter
    // The client will extract the token and store it
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  }
);

// ─── Protected Routes ───────────────────────────────────────

// GET /auth/me — Get current user info
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: formatUser(req.user) });
});

// PUT /auth/profile — Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'education', 'interests', 'role'];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json({ user: formatUser(user) });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile.' });
  }
});

// POST /auth/logout — Logout (client-side token removal, server just acknowledges)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

export default router;
