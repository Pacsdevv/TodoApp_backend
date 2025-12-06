import express from 'express'
import { pool } from './config/database.js'  

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()')
    res.json({ 
      message: 'ESM + Docker + PostgreSQL funcionando!',
      db_time: rows[0].now 
    })
  } catch (err) {
    res.status(500).json({ error: 'DB no conectada' })
  }
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})