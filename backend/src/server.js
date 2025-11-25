import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables BEFORE other imports
const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

console.log('Loading .env from:', envPath);
console.log('DATABASE_PATH:', process.env.DATABASE_PATH || 'Using default');

// Now import everything else
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database.js';

// Debug: Log environment variables
console.log('Environment loaded:');
console.log('PORT:', process.env.PORT);
console.log('DATABASE_PATH:', process.env.DATABASE_PATH ? '✓ Loaded' : '✗ Using default');

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import typingRoutes from './routes/typing.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import classRoutes from './routes/class.routes.js';
import schoolRoutes from './routes/school.routes.js';
import progressRoutes from './routes/progress.routes.js';
import certificateRoutes from './routes/certificate.routes.js';
import achievementRoutes from './routes/achievement.routes.js';
import leaderboardRoutes from './routes/leaderboard.routes.js';
import voiceRoutes from './routes/voice.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'JFFT API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/typing', typingRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/voice', voiceRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Database connection and server start
connectDatabase()
  .then(() => {
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 JFFT API Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`💾 Database: SQLite`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

export default app;
