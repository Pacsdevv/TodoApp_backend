import type { NextFunction, Request, Response } from "express";
import * as authService from "./service";
import { createSuccessResponse } from "../../config/ResponseCreator";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.signUp(req.body);
    const { user, token } = result;

    return createSuccessResponse(res, {
      data: {
        message: "User registered successfully",
        user,
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.login(req.body);
    const { user, token } = result;

    return createSuccessResponse(res.status(200), {
      data: {
        message: "Successful login!",
        user,
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
