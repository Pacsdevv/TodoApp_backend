import express from "express";
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
