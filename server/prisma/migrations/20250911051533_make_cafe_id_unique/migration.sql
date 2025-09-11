/*
  Warnings:

  - A unique constraint covering the columns `[cafeId]` on the table `CafeInput` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CafeInput_cafeId_key" ON "public"."CafeInput"("cafeId");
