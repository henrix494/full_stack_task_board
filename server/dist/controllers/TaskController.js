"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskControllers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.TaskControllers = {
    newTask: async (req, res) => {
        const boardId = req.params.board_id;
        const newTask = await prisma_1.default.tasks.create({
            data: {
                icon: "/clock-svgrepo-com.svg",
                description: "Task in Progress",
                boardId: boardId,
                title: "Task in Progress",
                type: "Task in Progress",
            },
        });
        res.status(201).send({ msg: "ok", id: newTask.id });
    },
    deleteTask: async (req, res) => {
        const taskId = Number(req.params.task_id);
        const deleteTask = await prisma_1.default.tasks.delete({
            where: {
                id: taskId,
            },
        });
        return res.status(201).send({ msg: "ok" });
    },
    editTask: async (req, res) => {
        const taskid = Number(req.params.task_id);
        const { id, title, type, description, boardId, icon } = await req.body;
        const editTask = await prisma_1.default.tasks.update({
            where: {
                id: taskid,
            },
            data: {
                boardId: boardId,
                description: description,
                icon: icon,
                id: id,
                title: title,
                type: type,
            },
        });
        return res.status(201).send({ msg: "ok" });
    },
};
