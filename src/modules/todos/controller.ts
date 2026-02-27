import type { NextFunction, Request, Response } from "express";
import * as todoService from "./service";
import type { AuthRequest } from "../../lib/types";
import { todo } from "node:test";
import { nextTick } from "process";
import { createError } from "../../middlewares/errorHandler";

export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;

    const todo = await todoService.createTodo(req.body, user_id);

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;

    const todos = await todoService.getAllTodos(user_id);

    res.status(200).json({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTodoById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const todo_id = Number(req.params.id);
    if (todo_id < 1) {
      throw createError("Invalid todo id", 400);
    }

    const todo = await todoService.getTodoById(todo_id, user_id);

    res.status(200).json({
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTodosByCategoryId = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const category_id = Number(req.params.id);
    if (category_id < 1) {
      throw createError("Invalid category id", 400);
    }

    const todos = await todoService.getTodosByCategoryId(user_id, category_id);

    res.status(200).json({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const todo_id = Number(req.params.id);
    if (todo_id < 1) {
      throw createError("Invalid todo id", 400);
    }

    const todo = await todoService.updateTodo(todo_id, req.body, user_id);

    res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.user!.user_id;
    const todo_id = Number(req.params.id);
    if (todo_id < 1) {
      throw createError("Invalid todo id", 400);
    }

    await todoService.deleteTodo(todo_id, user_id);

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
