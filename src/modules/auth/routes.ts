import { Router } from "express";
import * as authController from "./controller";
import { schemaValidation } from "../../middlewares/validation";
import { loginSchema, registerSchema } from "./schemas";

const router = Router();

router.post(
  "/sign-up",
  schemaValidation(registerSchema),
  authController.signUp
);
router.post("/login", schemaValidation(loginSchema), authController.login);

export default router;
