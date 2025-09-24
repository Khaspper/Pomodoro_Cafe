"use strict";
/// <reference types="node" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const getCafes_1 = __importDefault(require("./getCafes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new prisma_1.PrismaClient();
async function seed() {
    const data = await (0, getCafes_1.default)();
    if (data && data.elements && Array.isArray(data.elements)) {
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
                            officialName: c.tags.official_name,
                        },
                    });
                }
                else {
                    await prisma.cafe.create({
                        data: {
                            type: c.type,
                            lat: c.lat,
                            lon: c.lon,
                            brand: c.tags.brand,
                            name: c.tags.name,
                            officialName: c.tags.official_name,
                        },
                    });
                }
            }
        });
    }
    else {
        console.log("I COULDN'T RETRIEVE IT!!");
    }
    const hashPassword = await bcrypt_1.default.hash("validPassword", 10);
    await prisma.user.create({
        data: {
            username: "validUser",
            password: hashPassword,
            email: "valid@example.com",
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
// First Reset DB
// Then --name init it
// Finally seed it
//# sourceMappingURL=seed.js.map