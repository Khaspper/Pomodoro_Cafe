/*
  Warnings:

  - You are about to alter the column `avgWifi` on the `CafeStats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `avgOutlets` on the `CafeStats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `avgSeating` on the `CafeStats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `avgWifi` on table `CafeStats` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avgOutlets` on table `CafeStats` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avgSeating` on table `CafeStats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CafeStats" ALTER COLUMN "avgWifi" SET NOT NULL,
ALTER COLUMN "avgWifi" SET DATA TYPE INTEGER,
ALTER COLUMN "avgOutlets" SET NOT NULL,
ALTER COLUMN "avgOutlets" SET DATA TYPE INTEGER,
ALTER COLUMN "avgSeating" SET NOT NULL,
ALTER COLUMN "avgSeating" SET DATA TYPE INTEGER;
