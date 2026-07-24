import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyToken } from "../utils/jwt";
import type { JwtPayload } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Authentication token is required", 401));
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const requireRoles =
  (...roles: JwtPayload["role"][]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Authentication token is required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    return next();
  };
