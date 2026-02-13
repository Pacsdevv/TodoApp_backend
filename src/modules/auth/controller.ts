import type { NextFunction, Request, Response } from "express";
import * as authService from "./service";
import { createSuccessResponse } from "../../config/ResponseCreator";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.signUp(req.body);

    return createSuccessResponse(res, {
      data: {
        message: "User registered successfully",
        user,
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
    // const { email, password } = req.body;
    const user = await authService.login(req.body);

    return createSuccessResponse(res.status(200), {
      data: {
        message: "Successful login!",
        user,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
