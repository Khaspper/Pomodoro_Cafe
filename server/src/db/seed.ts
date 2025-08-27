import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.create({
    data: {
      username: "khaspper",
      password: "qwerty",
      email: "mark@example.com",
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

export default prisma;
