import { pool } from "../../config/database";
import type { UpdateTodoDTO } from "../../lib/dtos";
import type { CreateTodoData, Todo } from "../../lib/types";

export const createTodo = async (data: CreateTodoData): Promise<Todo> => {
  const { title, description, completed, user_id, category_id } = data;
  const { rows } = await pool.query(
    `INSERT INTO todos (title, description, completed, user_id, category_id) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      title,
      description || null,
      completed || false,
      user_id,
      category_id || null,
    ]
  );

  return rows[0];
};

export const getAllTodos = async (user_id: number): Promise<Todo[]> => {
  const { rows } = await pool.query(
    `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`,
    [user_id]
  );

  return rows;
};

export const getTodoById = async (
  id: number,
  user_id: number
): Promise<Todo | null> => {
  const { rows } = await pool.query(
    `SELECT * FROM todos WHERE id = $1 AND user_id = $2`,
    [id, user_id]
  );

  return rows[0] || null;
};

export const getTodosByCategoryId = async (
  user_id: number,
  category_id: number
): Promise<Todo[]> => {
  const { rows } = await pool.query(
    `SELECT * FROM todos 
    WHERE user_id = $1 AND category_id = $2 ORDER BY created_at DESC`,
    [user_id, category_id]
  );

  return rows;
};

export const updateTodo = async (
  id: number,
  body: UpdateTodoDTO,
  user_id: number
): Promise<Todo | null> => {
  const updates = [];
  const values = [];
  let paramIndex = 1;

  if (body.title) {
    updates.push(`title = $${paramIndex++}`);
    values.push(body.title);
  }

  if (body.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(body.description);
  }

  if (body.completed !== undefined) {
    updates.push(`completed = $${paramIndex++}`);
    values.push(body.completed);
  }

  if (body.category_id !== undefined) {
    updates.push(`category_id = $${paramIndex++}`);
    values.push(body.category_id);
  }

  if (updates.length === 0) return null;

  values.push(id, user_id);

  const query = `UPDATE todos SET ${updates.join(", ")} WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} RETURNING *`;

  const { rows } = await pool.query(query, values);

  return rows[0] || null;
};

export const deleteTodo = async (
  id: number,
  user_id: number
): Promise<boolean> => {
  const { rows } = await pool.query(
    `DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id`,
    [id, user_id]
  );

  return rows[0] || null;
};
