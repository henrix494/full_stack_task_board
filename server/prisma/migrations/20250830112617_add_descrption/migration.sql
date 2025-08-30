/*
  Warnings:

  - You are about to drop the column `desorption` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `desorption` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `description` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Boards" DROP COLUMN "desorption",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tasks" DROP COLUMN "desorption",
ADD COLUMN     "description" TEXT NOT NULL;
