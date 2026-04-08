import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import { ApiError } from './utils/ApiError.js';
import { initCronJobs } from './services/cronJobs.js';

// Routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import assessmentRoutes from './routes/assessments.js';
import careerRoutes from './routes/careers.js';
import recommendationRoutes from './routes/recommendations.js';
import skillGapRoutes from './routes/skillGap.js';
import savedRoutes from './routes/saved.js';
import dashboardRoutes from './routes/dashboard.js';
import notificationRoutes from './routes/notifications.js';
import chatbotRoutes from './routes/chatbot.js';
import reportRoutes from './routes/report.js';
import jobsRoutes from './routes/jobs.js';
import employeesRoutes from './routes/employees.js';
import companiesRoutes from './routes/companies.js';

// Admin routes
import adminIndexRoutes from './routes/admin/index.js';
import adminAssessmentRoutes from './routes/admin/assessments.js';
import adminCareerRoutes from './routes/admin/careers.js';
import adminSkillRoutes from './routes/admin/skills.js';
import adminRoadmapRoutes from './routes/admin/roadmaps.js';
import adminUserRoutes from './routes/admin/users.js';
import adminDataPipelineRoutes from './routes/admin/dataPipeline.js';
import adminFaqRoutes from './routes/admin/faqs.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Configure Passport
configurePassport();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ─── Rate Limiting ──────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many authentication attempts, please try again later.' },
});

app.use(generalLimiter);

// ─── Logging ────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Core Middleware ────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// ─── Health Check ───────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// ─── API Routes ─────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/faqs', adminFaqRoutes);  // public + admin FAQ

// ─── Admin Routes ───────────────────────────────────────
app.use('/api/admin', adminIndexRoutes);
app.use('/api/admin/assessments', adminAssessmentRoutes);
app.use('/api/admin/careers', adminCareerRoutes);
app.use('/api/admin/skills', adminSkillRoutes);
app.use('/api/admin/roadmaps', adminRoadmapRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/data', adminDataPipelineRoutes);

// Legacy route support (keep /auth working for existing Google OAuth)
app.use('/auth', authRoutes);

// ─── 404 Handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Centralized Error Handler ──────────────────────────
app.use((err, req, res, next) => {
  // Log error
  console.error('❌ Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Handle known API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists`,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/health`);
  console.log(`🔑 Auth: http://localhost:${PORT}/api/auth`);
  
  // Start Background Sync Pipeline
  initCronJobs();
});

export default app;
