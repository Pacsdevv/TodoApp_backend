import { createSuccessResponse } from "../../config/ResponseCreator";
import { createUser, getAllUser } from "./service";
import type { Request, Response } from "express";

export const handleGetUsers = async (req: Request, res: Response) => {
  const rows = await getAllUser();
  return createSuccessResponse(res, { data: { users: rows } });
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const rows = createUser(req.body);
  return createSuccessResponse(res, { data: { createdUser: rows } });
};
