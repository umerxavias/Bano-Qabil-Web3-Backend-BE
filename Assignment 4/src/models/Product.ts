import { Schema, model } from 'mongoose';
import { IProduct } from '../types';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

export const Product = model<IProduct>('Product', productSchema);
