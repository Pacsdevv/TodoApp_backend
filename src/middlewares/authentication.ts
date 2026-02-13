import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createError } from "./errorHandler.js";
import type { AuthRequest, AuthPayload } from "../lib/types.js";
import { config } from "../config/index.js";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError("No token provided", 401);
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, config.jwtSecret) as AuthPayload;

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
