import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { pool } from "./config/database.js";
import UserRouter from "./modules/users/routes";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.json({
      message: "ESM + Docker + PostgreSQL funcionando!",
      db_time: rows[0].now,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB no conectada" });
  }
});

app.use(UserRouter);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack || err);
  res.status(500).json({ error: "Internal Server Error" });
});
