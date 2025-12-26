import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { IProduct } from '../types';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, quantity, category }: IProduct = req.body;
    const product = new Product({ title, description, price, quantity, category });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
