import { Router } from "express";
import { getAllUser, createUser } from "./service";
import { handleCreateUser, handleGetUsers } from "./controller";

const router = Router();

router.get("/user", async (req, res) => handleGetUsers(req, res));

router.post("/user", async (req, res) => handleCreateUser(req, res));

export default router;
