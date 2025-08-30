/*
  Warnings:

  - Added the required column `desorption` to the `Boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Boards" ADD COLUMN     "desorption" TEXT NOT NULL;
