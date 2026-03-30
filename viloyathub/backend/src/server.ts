// backend/src/server.ts
import app from './app';
import { connectDB } from './config/database';
import { redisClient } from './config/redis';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to PostgreSQL
    await connectDB();
    console.log('✅ PostgreSQL connected');
    
    // Connect to Redis
    await redisClient.connect();
    console.log('✅ Redis connected');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();