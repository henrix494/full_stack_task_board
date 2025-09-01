"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const router = (0, express_1.Router)();
router.post("/:board_id", TaskController_1.TaskControllers.newTask);
router.delete("/:task_id", TaskController_1.TaskControllers.deleteTask);
router.patch("/:task_id", TaskController_1.TaskControllers.editTask);
exports.default = router;
