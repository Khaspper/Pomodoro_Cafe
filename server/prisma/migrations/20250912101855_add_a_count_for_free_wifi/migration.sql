-- AlterTable
ALTER TABLE "public"."CafeStats" ADD COLUMN     "wifiNoCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wifiYesCount" INTEGER NOT NULL DEFAULT 0;
