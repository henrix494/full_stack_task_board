-- CreateTable
CREATE TABLE "public"."Boards" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "desorption" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Tasks" ADD CONSTRAINT "Tasks_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
