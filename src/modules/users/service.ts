import { pool } from "../../config/database";

export const getAllUser = async () => {
  const { rows } = await pool.query(`SELECT * from public."users";`);
  return rows;
};

type CreateUserDto = {
  name: string;
  email: string;
  pass: string;
};

export const createUser = async (body: CreateUserDto) => {
  const { rows } = await pool.query(
    `INSERT INTO public.users
(id, "name", email, "password")
VALUES(nextval('users_id_seq'::regclass), $1, $2, $3) returning *`,
    [body.name, body.email, body.pass],
  );
  return rows;
};
