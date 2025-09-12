/*
  Warnings:

  - You are about to drop the column `avgOutlets` on the `CafeStats` table. All the data in the column will be lost.
  - You are about to drop the column `avgSeating` on the `CafeStats` table. All the data in the column will be lost.
  - You are about to drop the column `avgWifi` on the `CafeStats` table. All the data in the column will be lost.
  - You are about to drop the column `wifiNoCount` on the `CafeStats` table. All the data in the column will be lost.
  - You are about to drop the column `wifiYesCount` on the `CafeStats` table. All the data in the column will be lost.
  - Added the required column `outletCount` to the `CafeStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatingCount` to the `CafeStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifiCount` to the `CafeStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifiFreeCount` to the `CafeStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CafeStats" DROP COLUMN "avgOutlets",
DROP COLUMN "avgSeating",
DROP COLUMN "avgWifi",
DROP COLUMN "wifiNoCount",
DROP COLUMN "wifiYesCount",
ADD COLUMN     "outletCount" INTEGER NOT NULL,
ADD COLUMN     "seatingCount" INTEGER NOT NULL,
ADD COLUMN     "wifiCount" INTEGER NOT NULL,
ADD COLUMN     "wifiFreeCount" INTEGER NOT NULL;
