import { Router } from "express";
import * as todoController from "./controller";
import { authenticate } from "../../middlewares/authentication";
import { schemaValidation } from "../../middlewares/validation";
import { createTodoSchema, updateTodoSchema } from "./schemas";

const router = Router();

router.use(authenticate);

router.post("/", schemaValidation(createTodoSchema), todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.get("/category/:id", todoController.getTodosByCategoryId);
router.put(
  "/:id",
  schemaValidation(updateTodoSchema),
  todoController.updateTodo
);
router.delete("/:id", todoController.deleteTodo);

export default router;
