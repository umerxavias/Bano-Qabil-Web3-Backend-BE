/**
 * Product Validation Schemas
 * Author: Muhammad Umer Khan (402480)
 */

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required').max(50, 'Category must be less than 50 characters'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  sku: z.string().min(1, 'SKU is required').max(50, 'SKU must be less than 50 characters'),
  image: z.string().url('Image must be a valid URL').optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
