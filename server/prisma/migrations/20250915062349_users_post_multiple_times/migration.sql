/*
  Warnings:

  - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Comment_cafeId_userId_key";

-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "username" TEXT NOT NULL;
