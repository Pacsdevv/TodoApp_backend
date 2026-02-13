import { pool } from "../../config/database";
import type { Category, CreateCategoryData } from "../../lib/types";

export const createCategory = async (
  data: CreateCategoryData
): Promise<Category> => {
  const { name, description, user_id, color } = data;
  const { rows } = await pool.query(
    "INSERT INTO categories (name, description, user_id, color) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description || null, user_id, color || "#000000"]
  );

  return rows[0];
};

export const getAllCategories = async (
  user_id: number
): Promise<Category[]> => {
  const { rows } = await pool.query(
    `SELECT * FROM categories 
    WHERE user_id = $1 
    ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
};

export const getCategoryById = async (
  id: number,
  user_id: number
): Promise<Category | null> => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1 AND user_id = $2",
    [id, user_id]
  );
  return rows[0] || null;
};

export const updateCategory = async (
  id: number,
  body: { name?: string; description?: string; color?: string },
  user_id: number
): Promise<Category | null> => {
  const updates = [];
  const values = [];
  let paramIndex = 1;

  if (body.name) {
    updates.push(`name = $${paramIndex++}`);
    values.push(body.name);
  }

  if (body.description !== undefined) {
    updates.push(`description = $${paramIndex++}`);
    values.push(body.description);
  }

  if (body.color !== undefined) {
    updates.push(`color = $${paramIndex++}`);
    values.push(body.color);
  }

  if (updates.length === 0) return null;

  values.push(id, user_id);

  const query = `UPDATE categories SET ${updates.join(", ")} WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} RETURNING *`;

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const deleteCategory = async (
  id: number,
  user_id: number
): Promise<boolean> => {
  const { rows } = await pool.query(
    "DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING id",
    [id, user_id]
  );
  return rows[0] || null;
};
