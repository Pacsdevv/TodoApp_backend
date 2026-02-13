import { Router } from "express";
import * as categoryController from "./controller";
import { schemaValidation } from "../../middlewares/validation";
import { createCategorySchema, updateCategorySchema } from "./schemas";
import { authenticate } from "../../middlewares/authentication";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  schemaValidation(createCategorySchema),
  categoryController.createCategory
);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put(
  "/:id",
  schemaValidation(updateCategorySchema),
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

export default router;
