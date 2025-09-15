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
    select: { id: true, email: true, username: true },
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
//! Idek if I need this anymore
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
  freeWifi: number,
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

export async function createCafeStats(cafeId: number) {
  const data = await getAvgCafeStats(cafeId);
  await prisma.cafeStats.create({
    data: {
      cafeId,
      wifiCount: data._avg.wifiStrength,
      outletCount: data._avg.outlets,
      seatingCount: data._avg.seating,
      wifiFreeCount: data._avg.freeWifi,
    },
  });
}

export async function updateCafeStats(cafeId: number) {
  const data = await getAvgCafeStats(cafeId);
  await prisma.cafeStats.update({
    where: { cafeId },
    data: {
      cafeId,
      wifiCount: data._avg.wifiStrength,
      outletCount: data._avg.outlets,
      seatingCount: data._avg.seating,
      wifiFreeCount: data._avg.freeWifi,
    },
  });
}

export async function getCafeStats(cafeID: number) {
  return await prisma.cafeStats.findUnique({
    where: { cafeId: cafeID },
  });
}

export async function getAvgCafeStats(cafeId: number) {
  return await prisma.review.aggregate({
    where: { cafeId },
    _avg: {
      wifiStrength: true,
      freeWifi: true,
      outlets: true,
      seating: true,
    },
  });
}

export async function getReviewFromUser(cafeId: number, userId: number) {
  return await prisma.review.findUnique({
    where: {
      cafeId_userId: {
        cafeId,
        userId,
      },
    },
  });
}

export async function deleteUsersReview(cafeId: number, userId: number) {
  await prisma.review.delete({
    where: {
      cafeId_userId: {
        cafeId,
        userId,
      },
    },
  });
}

export async function postNewComment(
  cafeId: number,
  userId: number,
  username: string,
  message: string
) {
  await prisma.comment.create({
    data: {
      cafeId,
      userId,
      username,
      message,
    },
  });
  return;
}

export async function getComments(cafeId: number) {
  return await prisma.comment.findMany({
    where: { cafeId },
    orderBy: { createdAt: "desc" },
  });
}
