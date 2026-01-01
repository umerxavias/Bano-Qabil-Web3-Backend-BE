/**
 * Logger Middleware
 * Author: Muhammad Umer Khan (402480)
 */

import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const { method, url, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { statusCode } = res;
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - IP: ${ip}`
    );
  });

  next();
};
