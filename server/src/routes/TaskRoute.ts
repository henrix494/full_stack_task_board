import { Router } from "express";
import { TaskControllers } from "../controllers/TaskController";
const router = Router();
router.post("/:board_id", TaskControllers.newTask);
router.delete("/:task_id", TaskControllers.deleteTask);
router.patch("/:task_id", TaskControllers.editTask);
export default router;
