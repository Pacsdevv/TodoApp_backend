import type { Request, Response } from "express";
import * as todoService from "./service";


export const getAllTodos = async (req: Request, res: Response) => {
    const rows = await todoService.getAllTodos();
    res.send(rows);
};