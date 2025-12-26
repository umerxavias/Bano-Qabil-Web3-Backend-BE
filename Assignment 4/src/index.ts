import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middlewares/logger';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app';

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
