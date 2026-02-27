export type RegisterDTO = {
  name: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type UserDTO = {
  id: number;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export type CreateCategoryDTO = {
  name: string;
  description?: string;
  color?: string;
};

export type UpdateCategoryDTO = {
  name?: string;
  description?: string | undefined;
  color?: string;
};

export type CategoryDTO = {
  id: number;
  name: string;
  description: string | null;
  color: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateTodoDTO = {
  title: string;
  description: string;
  completed: boolean;
  category_id: number;
};

export type TodoDTO = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  category_id: number | null;
  created_at: Date;
  updated_at: Date;
};

export type UpdateTodoDTO = {
  title?: string | undefined;
  description?: string | undefined;
  completed?: boolean | undefined;
  category_id?: number | undefined;
};
