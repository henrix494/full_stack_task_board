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
    res.status(201).send({ msg: "ok" });
  },
};
