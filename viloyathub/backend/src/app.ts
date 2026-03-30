// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Routes
import authRoutes from './routes/auth.routes';
import grantRoutes from './routes/grant.routes';
import mentorRoutes from './routes/mentor.routes';
import mapRoutes from './routes/map.routes';
import userRoutes from './routes/user.routes';
import marketplaceRoutes from './routes/marketplace.routes';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/grants', grantRoutes);
app.use('/api/v1/mentor', mentorRoutes);
app.use('/api/v1/map', mapRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;