/**
 * Product Controller - Business Logic
 * Author: Muhammad Umer Khan (402480)
 */

import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { createProductSchema, updateProductSchema } from '../schemas/productSchema';
import { ZodError } from 'zod';
import { AppError } from '../middleware';

const handleZodError = (error: ZodError<any>) => {
  return error.issues.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const existingSku = await Product.findOne({ sku: validatedData.sku });
    if (existingSku) {
      throw new AppError(400, 'SKU already exists');
    }

    const product = new Product(validatedData);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: handleZodError(error),
      });
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(500, 'Internal server error'));
    }
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find({ isDeleted: false });

    res.status(200).json({
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(new AppError(500, 'Internal server error'));
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError(400, 'Invalid product ID format');
    }

    const product = await Product.findById(id);

    if (!product || product.isDeleted) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(500, 'Internal server error'));
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError(400, 'Invalid product ID format');
    }

    const validatedData = updateProductSchema.parse(req.body);

    if (validatedData.sku) {
      const existingSku = await Product.findOne({
        sku: validatedData.sku,
        _id: { $ne: id },
      });
      if (existingSku) {
        throw new AppError(400, 'SKU already exists');
      }
    }

    const product = await Product.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!product || product.isDeleted) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: handleZodError(error),
      });
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(500, 'Internal server error'));
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new AppError(400, 'Invalid product ID format');
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      data: product,
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(500, 'Internal server error'));
    }
  }
};
