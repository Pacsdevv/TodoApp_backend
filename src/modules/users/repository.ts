import { pool } from "../../config/database";
import type { User } from "../../lib/types";
import type { CreateUserDto } from "./service";

export const createUser = async (body: CreateUserDto): Promise<User> => {
  const { rows } = await pool.query(
    `INSERT INTO public.users ("name", "email", "password")
    VALUES ($1, $2, $3)
    RETURNING *`,
    [body.name, body.email, body.password]
  );

  return rows[0];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return rows[0] || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return rows[0] || null;
};
