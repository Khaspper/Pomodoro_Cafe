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

export async function cafeInputs(cafeId: number) {
  const cafes = await prisma.cafeInput.findFirst({
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

export async function findReview(cafeID: number) {
  const review = await prisma.cafeInput.findUnique({
    where: { cafeId: cafeID },
  });
  return review;
}

export async function reviewCafe(
  cafeID: number,
  wifiStrength: number,
  freeWifi: boolean,
  outlets: number,
  seating: number,
  numberOfInputs: number
) {
  await prisma.cafeInput.create({
    data: {
      cafeId: cafeID,
      wifiStrength,
      freeWifi,
      outlets,
      seating,
      numberOfInputs,
    },
  });
}
