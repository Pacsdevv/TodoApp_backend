import type { Request, Response } from "express";
import * as todoService from "./service";
import { error } from "console";


export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await todoService.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllTodos = async (req: Request, res: Response) => {
    try {
      const rows = await todoService.getAllTodos();
      res.send(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


export const getTodosByUser = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getTodosByUser(parseInt(req.params.userId));
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  };
};


export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.getTodoById(parseInt(req.params.id));
    res.json(todo);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  };
};


export const getTodosByCategoryId = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getTodosByCategoryId(parseInt(req.params.categoryId));
    res.json(todos);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  };
};


export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.updateTodos(parseInt(req.params.id), req.body);
    res.json(todo);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  };
};


export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deleted = await todoService.deleteTodo(parseInt(req.params.id));
    res.json({ message: "Todo deleted", deleted });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
}