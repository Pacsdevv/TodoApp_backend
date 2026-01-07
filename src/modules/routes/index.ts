import { Router } from "express";
import userRoutes from "../users/routes";
import categoryRoutes from "../categories/routes";
import todoRoutes from "../todos/routes"


const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/api/todos", todoRoutes);

router.get("/", (req, res) => res.send({ message: "Server is running" }));

export default router;