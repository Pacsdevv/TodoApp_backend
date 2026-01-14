import { pool } from '../../config/database';


export const createCategory = async (body: { name: string; description?: string; user_id: number; color?: string }) => {
  const { name, description, user_id, color } = body;
  const { rows } = await pool.query(
    'INSERT INTO categories (name, description, user_id, color) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description || null, user_id, color || "#000000"]
  );
  return rows[0];
};


export const getAllCategories = async () => {
  const { rows } = await pool.query(`SELECT * from public."categories";`)
  return rows;
};


export const getCategoriesByUser = async (user_id: number) => {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE user_id = $1 ORDER BY id',
    [user_id]
  );
  return rows;
};


export const getCategoryById = async (id: number) => {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0] || null;
};


export const updateCategory = async (id: number, body: { name?: string; description?: string; color?: string; }) => {
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

  values.push(id);
  const query = `UPDATE categories SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};


export const deleteCategory = async (id: number) => {
  const { rows } = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
  return rows[0] || null;
};