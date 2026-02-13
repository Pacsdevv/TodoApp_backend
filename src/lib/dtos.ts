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
  id: string;
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
