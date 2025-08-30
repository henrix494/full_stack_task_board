import { cwd } from "process";
import prisma from "../lib/prisma";
import { genUUid } from "../lib/uuidGen";
import { Request, Response } from "express";
const tasksOptions = ["Task in Progress", "Task Completed", "Task Wont Do"];
export const BoardControllers = {
  newBoard: async (req: Request, res: Response) => {
    const uuid = await genUUid();
    const newBoard = await prisma.boards.create({
      data: {
        id: uuid,
        name: "My Task Board",
        description: "Tasks to keep organized",
      },
    });
    const taskPromises = tasksOptions.map((item) =>
      prisma.tasks.create({
        data: {
          boardId: uuid,
          description: item,
          title: item,
          type: item,
        },
      })
    );
    await Promise.all(taskPromises);
    res.status(200).send({ msg: "ok", boardId: uuid });
  },
  getBoardById: async (req: Request, res: Response) => {
    const boardId = req.params.board_id;
    const board = await prisma.boards.findFirst({
      where: { id: boardId },
      include: {
        tasks: true,
      },
    });
    if (!board) res.status(401).send("Not found");
    else res.send(board);
  },
  editBoardById: async (req: Request, res: Response) => {
    const boardId = req.params.board_id;
    const { title, description } = await req.body;
    const board = await prisma.boards.findFirst({
      where: {
        id: boardId,
      },
    });
    if (!board) res.status(404).send("Board not found!");
    else {
      if (!title && !description)
        res.status(404).send("at least one of the fields is required");
      else if (title && !description) {
        await prisma.boards.update({
          where: {
            id: boardId,
          },
          data: {
            name: title,
          },
        });
        res.status(201).send("ok");
      } else if (!title && description) {
        await prisma.boards.update({
          where: {
            id: boardId,
          },
          data: {
            description: description,
          },
        });
        res.status(201).send("ok");
      } else {
        await prisma.boards.update({
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
  deleteBoardById: async (req: Request, res: Response) => {
    const boardId = req.params.board_id;
    try {
      await prisma.tasks.deleteMany({
        where: {
          boardId: boardId,
        },
      });
      await prisma.boards.delete({ where: { id: boardId } });
      res.status(204).send("OK");
    } catch (error) {
      res.status(404).send("Not found");
    }
  },
};
