import express from 'express';
import { pool } from './config/database';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as now, version()');
    res.json({
      message: 'API + PostgreSQL con Docker funcionando!',
      database_time: result.rows[0].now,
      version: result.rows[0].version,
    });
  } catch (err) {
    res.status(500).json({ error: 'Base de datos no conectada aún' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});