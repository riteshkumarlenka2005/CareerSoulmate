import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists by googleId
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // Update avatar if changed
            if (profile.photos?.[0]?.value && user.avatar !== profile.photos[0].value) {
              user.avatar = profile.photos[0].value;
              await user.save();
            }
            return done(null, user);
          }

          // Check if user exists by email (might have signed up differently before)
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.avatar = profile.photos?.[0]?.value || user.avatar;
            await user.save();
            return done(null, user);
          }

          // Create new user (auto-signup)
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            avatar: profile.photos?.[0]?.value || '',
            role: 'student',
            badges: ['welcome', 'google-user'],
            points: 50,
          });

          console.log(`🆕 New user created: ${user.email}`);
          return done(null, user);
        } catch (error) {
          console.error('Passport Google Strategy error:', error);
          return done(error, null);
        }
      }
    )
  );

  // Serialize/deserialize for session (minimal — we mainly use JWT)
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
