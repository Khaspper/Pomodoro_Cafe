/*
  Warnings:

  - You are about to drop the column `inputsCount` on the `CafeStats` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfInputs` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CafeStats" DROP COLUMN "inputsCount";

-- AlterTable
ALTER TABLE "public"."Review" DROP COLUMN "numberOfInputs";
