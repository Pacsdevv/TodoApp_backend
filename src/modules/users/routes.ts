import { Router } from "express";
import * as userController from "./contoller";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/user", userController.createUser);

export default router;
