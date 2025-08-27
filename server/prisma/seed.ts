/// <reference types="node" />

import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.create({
    data: {
      username: "qwertykira_",
      password: "marky",
      email: "kira@example.com",
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
