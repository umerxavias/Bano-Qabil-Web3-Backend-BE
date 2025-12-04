import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const method = req.method;
  const url = req.url;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  console.log(`[${date} ${time}] ${method} ${url}`);
  
  next();
};
