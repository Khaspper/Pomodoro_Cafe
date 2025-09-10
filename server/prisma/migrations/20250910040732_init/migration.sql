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
CREATE TABLE "public"."CafeInput" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "wifiStrength" INTEGER DEFAULT 3,
    "freeWifi" BOOLEAN,
    "outlets" INTEGER NOT NULL DEFAULT 3,
    "seating" INTEGER NOT NULL DEFAULT 3,
    "numberOfInputs" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CafeInput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "public"."session"("expire");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_lat_lon_key" ON "public"."Cafe"("lat", "lon");

-- AddForeignKey
ALTER TABLE "public"."CafeInput" ADD CONSTRAINT "CafeInput_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "public"."Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
