import { pool } from "../../config/database";
import type { CreateUserDto } from "./service";


export const getAllUsers = async () => {
  const { rows } = await pool.query(`SELECT * from public."users";`);
  return rows;
};


export const createUser = async (body: CreateUserDto) => {
  const { rows } = await pool.query(
    `INSERT INTO public.users ("name", "email", "password")
     VALUES ($1, $2, $3)
     RETURNING *`,
    [body.name, body.email, body.pass],
  );

  return rows[0];
};
