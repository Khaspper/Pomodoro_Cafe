/// <reference types="node" />

import { PrismaClient } from "../generated/prisma";
import getCafesFromOverPass from "./getCafes";
const prisma = new PrismaClient();

async function seed() {
  const data = await getCafesFromOverPass();

  if (data && data.elements) {
    const cafes = data.elements;
    cafes.forEach(async (c) => {
      if ("name" in c.tags && c.tags.takeaway !== "only") {
        if (c.type === "way") {
          await prisma.cafe.create({
            data: {
              type: c.type,
              lat: c.center.lat,
              lon: c.center.lon,
              brand: c.tags.brand,
              name: c.tags.name,
              official_name: c.tags.official_name,
            },
          });
        } else {
          await prisma.cafe.create({
            data: {
              type: c.type,
              lat: c.lat,
              lon: c.lon,
              brand: c.tags.brand,
              name: c.tags.name,
              official_name: c.tags.official_name,
            },
          });
        }
      }
    });
  } else {
    console.log("I COULDN'T RETRIEVE IT!!");
  }
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
