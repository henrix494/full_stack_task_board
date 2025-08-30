"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardControllers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const uuidGen_1 = require("../lib/uuidGen");
const tasksOptions = [
    { title: "Task in Progress", icon: "/clock-svgrepo-com.svg" },
    { title: "Task Completed", icon: "/coffee-1-svgrepo-com.svg" },
    { title: "Task Wont Do", icon: "/pc-svgrepo-com.svg" },
];
exports.BoardControllers = {
    newBoard: async (req, res) => {
        const uuid = await (0, uuidGen_1.genUUid)();
        const newBoard = await prisma_1.default.boards.create({
            data: {
                id: uuid,
                name: "My Task Board",
                description: "Tasks to keep organized",
            },
        });
        const taskPromises = tasksOptions.map((item) => prisma_1.default.tasks.create({
            data: {
                boardId: uuid,
                description: item.title,
                title: item.title,
                type: item.title,
                //@ts-ignores
                icon: item.icon,
            },
        }));
        await Promise.all(taskPromises);
        res.status(200).send({ msg: "ok", boardId: uuid });
    },
    getBoardById: async (req, res) => {
        const boardId = req.params.board_id;
        const board = await prisma_1.default.boards.findFirst({
            where: { id: boardId },
            include: {
                tasks: true,
            },
        });
        if (!board)
            res.status(401).send("Not found");
        else
            res.send(board);
    },
    editBoardById: async (req, res) => {
        const boardId = req.params.board_id;
        const { title, description } = await req.body;
        const board = await prisma_1.default.boards.findFirst({
            where: {
                id: boardId,
            },
        });
        if (!board)
            res.status(404).send("Board not found!");
        else {
            if (!title && !description)
                res.status(404).send("at least one of the fields is required");
            else if (title && !description) {
                await prisma_1.default.boards.update({
                    where: {
                        id: boardId,
                    },
                    data: {
                        name: title,
                    },
                });
                res.status(201).send("ok");
            }
            else if (!title && description) {
                await prisma_1.default.boards.update({
                    where: {
                        id: boardId,
                    },
                    data: {
                        description: description,
                    },
                });
                res.status(201).send("ok");
            }
            else {
                await prisma_1.default.boards.update({
                    where: { id: boardId },
                    data: {
                        description: description,
                        name: title,
                    },
                });
                res.status(201).send("ok");
            }
        }
    },
    deleteBoardById: async (req, res) => {
        const boardId = req.params.board_id;
        try {
            await prisma_1.default.tasks.deleteMany({
                where: {
                    boardId: boardId,
                },
            });
            await prisma_1.default.boards.delete({ where: { id: boardId } });
            res.status(204).send("OK");
        }
        catch (error) {
            res.status(404).send("Not found");
        }
    },
};
