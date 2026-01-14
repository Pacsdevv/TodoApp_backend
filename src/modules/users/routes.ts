import { Router } from "express";
import * as userController from "./controller";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);


export default router;
