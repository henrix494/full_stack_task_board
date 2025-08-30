// lib/prisma.ts (or utils/prisma.ts)
import { PrismaClient } from "../generated/prisma";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, store the instance on the global object
  // to prevent creating new instances on every hot-reload
  //@ts-ignore
  if (!global.prisma) {
    //@ts-ignore
    global.prisma = new PrismaClient();
  } //@ts-ignore
  prisma = global.prisma;
}

export default prisma;
