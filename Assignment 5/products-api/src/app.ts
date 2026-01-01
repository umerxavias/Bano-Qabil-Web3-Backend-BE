/**
 * Express Application Setup
 * Author: Muhammad Umer Khan (402480)
 */

import express from 'express';
import cors from 'cors';
import { logger, errorHandler } from './middleware';
import { getDBStatus } from './config/database';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    message: 'Server is running',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

export default app;
