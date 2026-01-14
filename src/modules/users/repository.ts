import { pool } from "../../config/database";
import type { CreateUserDto } from "./service";


export const createUser = async (body: CreateUserDto) => {
  const { rows } = await pool.query(
    `INSERT INTO public.users ("name", "email", "password")
    VALUES ($1, $2, $3)
    RETURNING *`,
    [body.name, body.email, body.pass],
  );
  
  return rows[0];
};


export const getAllUsers = async () => {
  const { rows } = await pool.query(`SELECT * from public."users";`);
  return rows;
};


export const getUserById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE id = $1`, [id]
  );
  return rows[0] || null; 
};