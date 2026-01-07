import { pool } from "../../config/database";


export const getAllTodos = async () => {
  const { rows } = await pool.query(`SELECT * from public."todos";`)
  return rows;
}
