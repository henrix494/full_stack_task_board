import { Router } from "express";
import { TaskControllers } from "../controllers/TaskController";
const router = Router();
router.post("/:board_id", TaskControllers.newTask);
export default router;
