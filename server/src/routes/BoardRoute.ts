import { Router } from "express";
import { BoardControllers } from "../controllers/BoardController";
const router = Router();
router.get("/", BoardControllers.newBoard);
router.get("/:board_id", BoardControllers.getBoardById);
router.put("/:board_id", BoardControllers.editBoardById);
router.delete("/:board_id", BoardControllers.deleteBoardById);

export default router;
