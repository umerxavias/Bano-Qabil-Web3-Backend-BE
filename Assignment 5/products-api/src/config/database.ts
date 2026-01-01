/**
 * Database Configuration
 * Author: Muhammad Umer Khan (402480)
 */

import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/products-api';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✓ MongoDB connected successfully');
    console.log(`  Database: ${mongoose.connection.name}`);
    console.log(`  Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const getDBStatus = (): string => {
  const state = mongoose.connection.readyState;
  const states: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[state] || 'unknown';
};
