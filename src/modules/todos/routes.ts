import { Router } from "express";
import * as todoController from "./controller";

const router = Router();

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/user/:userId", todoController.getTodosByUser);
router.get("/:id", todoController.getTodoById);
router.get("/category/:categoryId", todoController.getTodosByCategoryId);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
