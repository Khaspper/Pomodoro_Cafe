import { PrismaClient } from "../../generated/prisma";

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
  //! Don't forget to bcrypt the password
  try {
    if (await getUserByEmail(email)) throw new Error("Email already exists");
    if (await getUserByUsername(username))
      throw new Error("Username already exists");
    await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });
  } catch (error) {
    return error;
  }
}
