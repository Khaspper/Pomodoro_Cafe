-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "public"."Cafe" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "brand" TEXT,
    "name" TEXT NOT NULL,
    "officialName" TEXT,
    "spotifyLink" VARCHAR(512),

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "wifiStrength" INTEGER NOT NULL DEFAULT 3,
    "freeWifi" INTEGER NOT NULL DEFAULT 1,
    "outlets" INTEGER NOT NULL DEFAULT 3,
    "seating" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CafeStats" (
    "cafeId" INTEGER NOT NULL,
    "wifiCount" INTEGER,
    "outletCount" INTEGER,
    "seatingCount" INTEGER,
    "wifiFreeCount" INTEGER,

    CONSTRAINT "CafeStats_pkey" PRIMARY KEY ("cafeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "public"."session"("expire");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_lat_lon_key" ON "public"."Cafe"("lat", "lon");

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
