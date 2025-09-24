import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

const healthRouter = Router();

healthRouter.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ server: "up", db: "up" });
  } catch (err) {
    res.status(503).json({ server: "up", db: "down", error: String(err) });
  }
});

export default healthRouter;
