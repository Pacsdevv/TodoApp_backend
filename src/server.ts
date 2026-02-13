import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import indexRoutes from "./modules/routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   // console.error(err.stack || err);
//   res.status(500).json({ error: "Internal Server Error pipipi" });
// });
