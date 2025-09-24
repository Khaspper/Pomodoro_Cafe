"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = void 0;
exports.isAuthenticated = isAuthenticated;
exports.logout = logout;
exports.checkForErrors = checkForErrors;
const express_validator_1 = require("express-validator");
const queries_1 = require("../db/queries");
const spaceError = "cannot contain spaces.";
const validateSignup = [
    (0, express_validator_1.body)("username")
        .trim()
        .not()
        .contains(" ")
        .withMessage(`Username ${spaceError}`)
        .isAlphanumeric()
        .withMessage(`Username can only contain Alphanumeric characters.`)
        .custom(async (username, { req }) => {
        if ((await (0, queries_1.getUserByUsername)(username)) && username !== req.user.username)
            throw new Error("User already exists");
        return true;
    })
        .isLength({ min: 5, max: 12 })
        .withMessage("Username must be between 5 and 12 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .withMessage("Email must be in this format 'abc@xyz.com'")
        .custom(async (email, { req }) => {
        if ((await (0, queries_1.getUserByEmail)(email)) && email !== req.user.email)
            throw new Error("Email already exists.");
        return true;
    }),
    (0, express_validator_1.body)("password")
        .optional({ checkFalsy: true })
        .trim()
        .matches(/^\S*$/)
        .withMessage(`Passwords ${spaceError}`)
        .isLength({ min: 8 })
        .withMessage("Password be at least 8 characters long."),
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        // only check if password was provided
        if (req.body.password && req.body.password.trim() !== "") {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match.");
            }
        }
        return true;
    }),
];
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated())
        return next();
    return res.sendStatus(401);
}
async function logout(req, res, next) {
    req.logOut((error) => {
        if (error) {
            return res.status(400).json({ message: "Logout failed" });
        }
        // Destroy the session (this should remove it from the database via connect-pg-simple)
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ message: "Session destruction failed" });
            }
            // Clear the cookie
            res.clearCookie("connect.sid", {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                sameSite: "lax",
            });
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
}
function checkForErrors(req) {
    return (0, express_validator_1.validationResult)(req);
}
exports.updateAccount = [
    ...validateSignup,
    isAuthenticated,
    async (req, res, next) => {
        try {
            const errors = checkForErrors(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            if (req.user && req.user.username !== req.body.username) {
                await (0, queries_1.updateUsername)(req.user.username, req.body.username);
            }
            if (req.user && req.user.email !== req.body.email) {
                await (0, queries_1.updateEmail)(req.user.email, req.body.email);
            }
            if (req.user && req.body.password !== "") {
                await (0, queries_1.updatePassword)(req.user.id, req.body.password);
            }
            res.sendStatus(200);
        }
        catch (error) {
            console.error("Something went wrong updating the account.", error);
        }
    },
];
//# sourceMappingURL=accountController.js.map