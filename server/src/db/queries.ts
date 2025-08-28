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
    if (await getUserByEmail(email)) throw new Error("Email already exists");
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
