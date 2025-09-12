import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

export async function postNewUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  try {
    if (await getUserByUsername(username))
      throw new Error("Username already exists");
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        username,
        password: hash,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function getAllCafes() {
  const cafes = await prisma.cafe.findMany();
  return cafes;
}

export async function cafeReviews(cafeId: number) {
  const cafes = await prisma.review.findFirst({
    where: { cafeId: cafeId },
  });
  return cafes;
}

export async function addSong(spotifyLink: string, cafeId: number) {
  await prisma.cafe.update({
    where: { id: cafeId },
    data: {
      spotifyLink: spotifyLink,
    },
  });
}

export async function getCafeById(cafeID: number) {
  const exists = await prisma.cafe.findUnique({
    where: { id: cafeID },
  });
  return exists ? true : false;
}

export async function reviewCafe(
  userId: number,
  cafeId: number,
  wifiStrength: number,
  freeWifi: boolean,
  outlets: number,
  seating: number
) {
  await prisma.review.create({
    data: {
      userId,
      cafeId,
      wifiStrength,
      freeWifi,
      outlets,
      seating,
    },
  });
}

export async function createCafeStats(
  cafeId: number,
  wifiStrength: number,
  outlets: number,
  seating: number,
  freeWifi: boolean
) {
  const wifiFreeCount = freeWifi ? 0 : -1;

  await prisma.cafeStats.create({
    data: {
      cafeId,
      wifiCount: wifiStrength,
      outletCount: outlets,
      seatingCount: seating,
      wifiFreeCount,
    },
  });
}

export async function updateCafeStats(
  cafeId: number,
  avgWifi: number,
  avgOutlets: number,
  avgSeating: number,
  freeWifi: boolean
) {
  if (freeWifi) {
    await prisma.cafeStats.update({
      where: { cafeId },
      data: {
        wifiFreeCount: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.cafeStats.update({
      where: { cafeId },
      data: {
        wifiFreeCount: {
          decrement: 1,
        },
      },
    });
  }
  await prisma.cafeStats.update({
    where: { cafeId },
    data: {
      wifiCount: avgWifi,
      outletCount: avgOutlets,
      seatingCount: avgSeating,
    },
  });
}

export async function getCafeStats(cafeID: number) {
  return await prisma.cafeStats.findUnique({
    where: { cafeId: cafeID },
  });
}

export async function getAvgCafeStats(cafeID: number) {
  return await prisma.cafeStats.aggregate({
    where: { cafeId: cafeID },
    _avg: {
      wifiCount: true,
      outletCount: true,
      seatingCount: true,
    },
  });
}
