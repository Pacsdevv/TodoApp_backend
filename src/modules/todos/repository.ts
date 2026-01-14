import { pool } from "../../config/database";


export const createTodo = async (body: {
  title: string; 
  description?: string; 
  completed?: boolean; 
  user_id: number; 
  category_id?: string
}) => {
  
  const { title, description, completed = false, user_id, category_id } = body;
  const { rows } = await pool.query(
    `INSERT INTO todos (title, description, completed, user_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description || null, completed, user_id, category_id || null]
  );
  return rows[0];
};


export const getAllTodos = async () => {
  const { rows } = await pool.query(`SELECT * from public."todos";`)
  return rows;
};


export const getTodosByUser = async (user_id: number) => {
  const { rows } = await pool.query(`SELECT * FROM todos WHERE user_id = $1 ORDER BY id`, [user_id]
  );
  return rows;
};


export const getTodoById = async (id: number) => {
  const { rows } = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
  return rows[0] || null; 
}


export const getTodosByCategoryId = async (category_id: number) => {
  const { rows } = await pool.query(`SELECT * FROM todos WHERE category_id = $1`, [category_id]);
  return rows;
}

export const updateTodo = async (id: number, body: {
  title?: string; 
  description?: string; 
  completed?: boolean; 
  category_id?: number
}) => {

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

  values.push(id);
  const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};


export const deleteTodo = async (id: number) => {
  const { rows } = await pool.query(`DELETE FROM todos WHERE id = $1 RETURNING id`, [id]);
  return rows[0] || null;
};