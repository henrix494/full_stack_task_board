import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const TaskControllers = {
  newTask: async (req: Request, res: Response) => {
    const boardId = req.params.board_id;
    const newTask = await prisma.tasks.create({
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
  deleteTask: async (req: Request, res: Response) => {
    const taskId = Number(req.params.task_id);
    const deleteTask = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });
    return res.status(201).send({ msg: "ok" });
  },
  editTask: async (req: Request, res: Response) => {
    const taskid = Number(req.params.task_id);
    const { id, title, type, description, boardId, icon } = await req.body;
    const editTask = await prisma.tasks.update({
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
