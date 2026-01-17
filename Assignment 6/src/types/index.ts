// JWT Payload Interface
export interface JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";
}

// Request with user
import { Request } from "express";
export interface AuthRequest extends Request {
  user?: JwtPayload;
}
