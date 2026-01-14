import { createSuccessResponse } from "../../config/ResponseCreator";
import * as userService from "./service";
import type { Request, Response } from "express";


export const createUser = async (req: Request, res: Response) => {
  const rows = await userService.createUser(req.body);
  return createSuccessResponse(res, { data: { createdUser: rows } });
};


export const getAllUsers = async (req: Request, res: Response) => {
  const rows = await userService.getAllUsers();
  return createSuccessResponse(res, { data: { users: rows } });
};
 

export const getUserById = async (req: Request, res: Response) => {
  
  const user = await userService.getUserById(parseInt(req.params.id));
  return createSuccessResponse(res, { data: { user } });  
};