import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

export const User = model<IUser>('User', userSchema);
