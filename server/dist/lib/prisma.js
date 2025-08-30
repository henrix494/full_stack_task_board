"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/prisma.ts (or utils/prisma.ts)
const prisma_1 = require("../../dist/generated/prisma");
let prisma;
if (process.env.NODE_ENV === "production") {
    prisma = new prisma_1.PrismaClient();
}
else {
    // In development, store the instance on the global object
    // to prevent creating new instances on every hot-reload
    //@ts-ignore
    if (!global.prisma) {
        //@ts-ignore
        global.prisma = new prisma_1.PrismaClient();
    } //@ts-ignore
    prisma = global.prisma;
}
exports.default = prisma;
