import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import AuthService from '../services/authService.js';
import { NotFoundError } from '../utils/ApiError.js';

/**
 * GET /api/profile
 * Returns merged User + UserProfile data
 */
export const getProfile = catchAsync(async (req, res) => {
  const user = req.user;
  let profile = await UserProfile.findOne({ user: user._id });

  if (!profile) {
    profile = await UserProfile.create({ user: user._id });
  }

  const profileData = {
    user: AuthService.formatUser(user),
    profile: {
      education_level: profile.education_level,
      stream: profile.stream,
      occupation_status: profile.occupation_status,
      city: profile.city,
      state: profile.state,
      date_of_birth: profile.date_of_birth,
      gender: profile.gender,
      interests_text: profile.interests_text,
      known_skills: profile.known_skills,
      known_skills_ratings: profile.known_skills_ratings instanceof Map
        ? Object.fromEntries(profile.known_skills_ratings)
        : profile.known_skills_ratings || {},
      work_preference: profile.work_preference,
      preferred_industries: profile.preferred_industries,
      preferred_work_style: profile.preferred_work_style,
      career_preference: profile.career_preference,
      bio: profile.bio,
      profile_completion: profile.profile_completion,
      target_career: profile.target_career,
    },
  };

  ApiResponse.success(res, 'Profile retrieved', profileData);
});

/**
 * PUT /api/profile
 * Update user + extended profile
 */
export const updateProfile = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const data = req.body;

  // Fields that go to User model
  const userUpdates = {};
  if (data.fullName !== undefined) userUpdates.fullName = data.fullName;
  if (data.phone !== undefined) userUpdates.phone = data.phone;
  if (data.preferred_language !== undefined) userUpdates.preferred_language = data.preferred_language;
  if (data.education !== undefined) userUpdates.education = data.education;
  if (data.interests !== undefined) userUpdates.interests = data.interests;

  if (Object.keys(userUpdates).length > 0) {
    await User.findByIdAndUpdate(userId, { $set: userUpdates }, { runValidators: true });
  }

  // Fields that go to UserProfile model
  const profileFields = [
    'education_level', 'stream', 'occupation_status', 'city', 'state',
    'date_of_birth', 'gender', 'interests_text', 'known_skills',
    'known_skills_ratings', 'work_preference', 'preferred_industries',
    'preferred_work_style', 'career_preference', 'bio', 'target_career',
  ];

  const profileUpdates = {};
  for (const field of profileFields) {
    if (data[field] !== undefined) {
      profileUpdates[field] = data[field];
    }
  }

  let profile = await UserProfile.findOne({ user: userId });
  if (!profile) {
    profile = await UserProfile.create({ user: userId, ...profileUpdates });
  } else if (Object.keys(profileUpdates).length > 0) {
    Object.assign(profile, profileUpdates);
  }

  // Calculate profile completion
  profile.profile_completion = calculateCompletion(req.user, profile);
  await profile.save();

  // Return updated data
  const updatedUser = await User.findById(userId);
  ApiResponse.success(res, 'Profile updated', {
    user: AuthService.formatUser(updatedUser),
    profile: {
      education_level: profile.education_level,
      stream: profile.stream,
      occupation_status: profile.occupation_status,
      city: profile.city,
      state: profile.state,
      date_of_birth: profile.date_of_birth,
      gender: profile.gender,
      interests_text: profile.interests_text,
      known_skills: profile.known_skills,
      known_skills_ratings: profile.known_skills_ratings instanceof Map
        ? Object.fromEntries(profile.known_skills_ratings)
        : profile.known_skills_ratings || {},
      work_preference: profile.work_preference,
      preferred_industries: profile.preferred_industries,
      preferred_work_style: profile.preferred_work_style,
      career_preference: profile.career_preference,
      bio: profile.bio,
      profile_completion: profile.profile_completion,
      target_career: profile.target_career,
    },
  });
});

/**
 * DELETE /api/profile
 * Deactivate account
 */
export const deactivateAccount = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { account_status: 'deactivated' });
  ApiResponse.success(res, 'Account deactivated successfully');
});

/**
 * Calculate profile completion %
 */
function calculateCompletion(user, profile) {
  const checks = [
    !!user.fullName,
    !!user.phone,
    !!user.education?.level,
    (user.interests?.length || 0) > 0,
    !!profile.education_level,
    !!profile.occupation_status,
    !!profile.gender,
    (profile.known_skills?.length || 0) > 0,
    !!profile.work_preference,
    !!profile.career_preference,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}
