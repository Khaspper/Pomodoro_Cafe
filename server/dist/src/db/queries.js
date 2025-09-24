"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = getUserByUsername;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.postNewUser = postNewUser;
exports.getAllCafes = getAllCafes;
exports.cafeReviews = cafeReviews;
exports.addSong = addSong;
exports.getCafeById = getCafeById;
exports.reviewCafe = reviewCafe;
exports.createCafeStats = createCafeStats;
exports.updateCafeStats = updateCafeStats;
exports.getCafeStats = getCafeStats;
exports.getAvgCafeStats = getAvgCafeStats;
exports.getReviewFromUser = getReviewFromUser;
exports.deleteUsersReview = deleteUsersReview;
exports.postNewComment = postNewComment;
exports.getComments = getComments;
exports.updateUsername = updateUsername;
exports.updateEmail = updateEmail;
exports.updatePassword = updatePassword;
const prisma_1 = require("../../generated/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new prisma_1.PrismaClient();
async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    return user;
}
async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}
async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: { id: true, email: true, username: true },
    });
    return user;
}
async function postNewUser({ email, username, password, }) {
    try {
        if (await getUserByUsername(username))
            throw new Error("Username already exists");
        const hash = await bcrypt_1.default.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                username,
                password: hash,
            },
        });
    }
    catch (error) {
        return error;
    }
}
async function getAllCafes() {
    const cafes = await prisma.cafe.findMany();
    return cafes;
}
//! Idek if I need this anymore
async function cafeReviews(cafeId) {
    const cafes = await prisma.review.findFirst({
        where: { cafeId: cafeId },
    });
    return cafes;
}
async function addSong(spotifyLink, cafeId) {
    await prisma.cafe.update({
        where: { id: cafeId },
        data: {
            spotifyLink: spotifyLink,
        },
    });
}
async function getCafeById(cafeID) {
    const exists = await prisma.cafe.findUnique({
        where: { id: cafeID },
    });
    return exists ? true : false;
}
async function reviewCafe(userId, cafeId, wifiStrength, freeWifi, outlets, seating) {
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
async function createCafeStats(cafeId) {
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
async function updateCafeStats(cafeId) {
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
async function getCafeStats(cafeID) {
    return await prisma.cafeStats.findUnique({
        where: { cafeId: cafeID },
    });
}
async function getAvgCafeStats(cafeId) {
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
async function getReviewFromUser(cafeId, userId) {
    return await prisma.review.findUnique({
        where: {
            cafeId_userId: {
                cafeId,
                userId,
            },
        },
    });
}
async function deleteUsersReview(cafeId, userId) {
    await prisma.review.delete({
        where: {
            cafeId_userId: {
                cafeId,
                userId,
            },
        },
    });
}
async function postNewComment(cafeId, userId, username, message) {
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
async function getComments(cafeId) {
    return await prisma.comment.findMany({
        where: { cafeId },
        orderBy: { createdAt: "desc" },
    });
}
async function changeUsernameInComments(oldUsername, newUsername) {
    await prisma.comment.updateMany({
        where: {
            username: oldUsername,
        },
        data: {
            username: newUsername,
        },
    });
}
async function updateUsername(oldUsername, newUsername) {
    await prisma.user.update({
        where: {
            username: oldUsername,
        },
        data: {
            username: newUsername,
        },
    });
    await changeUsernameInComments(oldUsername, newUsername);
}
async function updateEmail(oldEmail, newEmail) {
    await prisma.user.update({
        where: {
            email: oldEmail,
        },
        data: {
            email: newEmail,
        },
    });
}
async function updatePassword(userId, password) {
    const newPassword = await bcrypt_1.default.hash(password, 10);
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: newPassword,
        },
    });
}
//# sourceMappingURL=queries.js.map