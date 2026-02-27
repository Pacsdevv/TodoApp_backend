import type { Request } from "express";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type Category = {
  id: number;
  name: string;
  description: string | null;
  user_id: number;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type Todo = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  user_id: number;
  category_id: number | null;
  created_at: Date;
  updated_at: Date;
};

export type CreateTodoData = {
  title: string;
  description?: string | undefined;
  completed?: boolean;
  user_id: number;
  category_id?: number | undefined;
};

export type CreateCategoryData = {
  name: string;
  description?: string;
  user_id: number;
  color?: string;
};

export type AuthResponse = {
  user: Omit<User, "password">;
  token: string;
};

export type AuthPayload = {
  user_id: number;
  email: string;
};

export type AuthRequest = Request & {
  user?: AuthPayload;
};
