import type { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from "../../lib/dtos";
import { createError } from "../../middlewares/errorHandler";
import * as todoRepository from "./repository";

export const createTodo = async (
  body: CreateTodoDTO,
  user_id: number
): Promise<TodoDTO> => {
  // if (!body.title || !user_id) throw new Error("title and user_id required");

  const todo = await todoRepository.createTodo({
    title: body.title,
    description: body.description,
    completed: body.completed,
    category_id: body.category_id,
    user_id,
  });

  return todo;
};

export const getAllTodos = async (user_id: number): Promise<TodoDTO[]> => {
  const todos = await todoRepository.getAllTodos(user_id);

  return todos;
};

export const getTodoById = async (
  id: number,
  user_id: number
): Promise<TodoDTO> => {
  const todo = await todoRepository.getTodoById(id, user_id);

  if (!todo) throw createError("Todo not found", 404);

  return todo;
};

export const getTodosByCategoryId = async (
  user_id: number,
  category_id: number
): Promise<TodoDTO[]> => {
  const todos = await todoRepository.getTodosByCategoryId(user_id, category_id);

  return todos;
};

export const updateTodo = async (
  id: number,
  body: UpdateTodoDTO,
  user_id: number
): Promise<TodoDTO> => {
  if (
    body.title === undefined &&
    body.description === undefined &&
    body.completed === undefined &&
    body.category_id === undefined
  ) {
    throw createError("At least one field to update", 400);
  }

  const updatedTodo = await todoRepository.updateTodo(id, body, user_id);
  if (!updatedTodo) throw createError("Failed to update todo", 500);

  return updatedTodo;
};

export const deleteTodo = async (
  id: number,
  user_id: number
): Promise<void> => {
  const deleted = await todoRepository.deleteTodo(id, user_id);

  if (!deleted) throw createError("Todo not found", 404);
};
