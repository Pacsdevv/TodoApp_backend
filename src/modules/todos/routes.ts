import { Router } from "express";
import * as todoController from "./controller";


const router = Router();

router.get("/", todoController.getAllTodos);


export default router;