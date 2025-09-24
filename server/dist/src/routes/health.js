"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const healthRouter = (0, express_1.Router)();
healthRouter.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.status(200).json({ server: "up", db: "up" });
    }
    catch (err) {
        res.status(503).json({ server: "up", db: "down", error: String(err) });
    }
});
exports.default = healthRouter;
//# sourceMappingURL=health.js.map