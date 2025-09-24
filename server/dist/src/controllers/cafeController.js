"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewComment = exports.postNewSong = exports.postCafeReview = void 0;
exports.getCafes = getCafes;
exports.getCafeReviews = getCafeReviews;
exports.getCommentsController = getCommentsController;
const queries_1 = require("../db/queries");
const express_validator_1 = require("express-validator");
const validateReview = [
    (0, express_validator_1.param)("id").isInt().withMessage("Cafe ID must be a valid integer"),
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (!req.user?.id || isNaN(Number(req.user.id))) {
            throw new Error("User must be authenticated");
        }
        return true;
    }),
    (0, express_validator_1.body)("wifiStrength")
        .notEmpty()
        .withMessage("Wifi Strength input cannot be empty.")
        .isInt({ min: 1, max: 3 })
        .toInt()
        .withMessage("Wifi Strength has to be or between 1 and 5."),
    (0, express_validator_1.body)("outlets")
        .notEmpty()
        .withMessage("Outlet input cannot be empty.")
        .isInt({ min: 1, max: 5 })
        .toInt()
        .withMessage("Outlet has to be or between 1 and 5."),
    (0, express_validator_1.body)("seating")
        .notEmpty()
        .withMessage("Seating input cannot be empty.")
        .isInt({ min: 1, max: 5 })
        .toInt()
        .withMessage("Seating has to be or between 1 and 5."),
    (0, express_validator_1.body)("freeWifi")
        .notEmpty()
        .withMessage("Free Wifi input cannot be empty.")
        .isInt({ min: 0, max: 1 })
        .toInt()
        .withMessage("Free Wifi has to be either 0 or 1."),
];
const validateComment = [
    (0, express_validator_1.body)("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment cannot be empty.")
        .isLength({ min: 1, max: 255 })
        .withMessage("Comment has to be less than 255 characters."),
];
const validateSpotifyLink = [
    (0, express_validator_1.body)("spotifyLink")
        .trim()
        .notEmpty()
        .withMessage("Link cannot be empty.")
        .isURL({ protocols: ["http", "https"], require_protocol: true })
        .withMessage("spotifyLink must be a valid URL")
        .matches(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/)
        .withMessage("Must be a valid Spotify track link"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
async function getCafes(req, res) {
    const cafes = await (0, queries_1.getAllCafes)();
    res.send(cafes);
}
async function getCafeReviews(req, res) {
    const cafeId = Number(req.params.id);
    const response = await (0, queries_1.getCafeStats)(cafeId);
    if (!response || response === null) {
        return res
            .status(204)
            .json({ message: "No reviews for this cafe", inputs: [] });
    }
    return res.status(200).send(response);
}
exports.postCafeReview = [
    ...validateReview,
    async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            //?⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄ This is reviews and user and cafe id to tie the reviews to ⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄
            const userID = Number(req.user?.id);
            const cafeID = Number(req.params.id);
            const wifiStrength = req.body.wifiStrength;
            const outlets = req.body.outlets;
            const seating = req.body.seating;
            const freeWifi = req.body.freeWifi;
            //?^^^^^^^^^^^^^^^ This is reviews and user and cafe id to tie the reviews to ^^^^^^^^^^^^^^^
            // Checks to see if the cafe even exists
            const exists = await (0, queries_1.getCafeById)(cafeID);
            let message = "Received Review!";
            if (exists) {
                const userReview = await (0, queries_1.getReviewFromUser)(cafeID, userID);
                if (userReview) {
                    await (0, queries_1.deleteUsersReview)(cafeID, userID);
                    console.log("Previous review has been deleted");
                    message = "Previous review has been deleted";
                }
                await (0, queries_1.reviewCafe)(userID, cafeID, wifiStrength, freeWifi, outlets, seating);
                // After adding the review we need to update the CafeStats model
                const cafe = await (0, queries_1.getCafeStats)(cafeID);
                if (!cafe) {
                    await (0, queries_1.createCafeStats)(cafeID);
                }
                else {
                    await (0, queries_1.updateCafeStats)(cafeID);
                }
                return res.status(201).json({ message });
            }
            else {
                throw new Error("Error in postCafeReview.");
            }
        }
        catch (error) {
            console.error("Cafe doesn't exist", error);
        }
    },
];
exports.postNewSong = [
    ...validateSpotifyLink,
    async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(401).json(errors);
            }
            await (0, queries_1.addSong)(req.body.spotifyLink, req.body.cafeID);
            res.status(201).json({ message: `Updated cafe ${req.body.cafeID}` });
        }
        catch (error) {
            console.error("Failed to add new song.", error);
        }
    },
];
// in the legend use chairs as a star like remember
// One outlet means 1 pair
// One seating means 4 chairs
// blue light brown
exports.addNewComment = [
    validateComment,
    async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            // Check to see if the cafe even exists
            const cafeID = req.params.id;
            const exists = await (0, queries_1.getCafeById)(Number(cafeID));
            if (!exists) {
                throw new Error("Cafe does not exists");
            }
            // Get usernames by userID
            await (0, queries_1.postNewComment)(Number(cafeID), Number(req.user?.id), String(req.user?.username), req.body.comment);
            res.sendStatus(201);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: "Cafe doesn't exists" });
        }
    },
];
async function getCommentsController(req, res) {
    const comments = await (0, queries_1.getComments)(Number(req.params.id));
    res.status(200).json({ comments });
}
//# sourceMappingURL=cafeController.js.map