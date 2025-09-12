/*
  Warnings:

  - You are about to drop the `CafeInput` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CafeInput" DROP CONSTRAINT "CafeInput_cafeId_fkey";

-- DropTable
DROP TABLE "public"."CafeInput";

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "wifiStrength" INTEGER DEFAULT 3,
    "freeWifi" BOOLEAN,
    "outlets" INTEGER NOT NULL DEFAULT 3,
    "seating" INTEGER NOT NULL DEFAULT 3,
    "numberOfInputs" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CafeStats" (
    "cafeId" INTEGER NOT NULL,
    "inputsCount" INTEGER NOT NULL DEFAULT 0,
    "avgWifi" DOUBLE PRECISION,
    "avgOutlets" DOUBLE PRECISION,
    "avgSeating" DOUBLE PRECISION,

    CONSTRAINT "CafeStats_pkey" PRIMARY KEY ("cafeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_cafeId_key" ON "public"."Review"("cafeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "public"."Review"("userId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "public"."Review"("userId");

-- CreateIndex
CREATE INDEX "Review_cafeId_idx" ON "public"."Review"("cafeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_cafeId_userId_key" ON "public"."Review"("cafeId", "userId");

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CafeStats" ADD CONSTRAINT "CafeStats_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
