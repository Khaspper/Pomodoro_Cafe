"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
exports.sendLoginErrors = sendLoginErrors;
const express_validator_1 = require("express-validator");
const queries_1 = require("../db/queries");
const emptyError = "cannot be empty.";
const spaceError = "cannot contain spaces.";
const validateLogin = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage(`Email ${emptyError}`)
        .isEmail()
        .withMessage("email must be in this format 'abc@xyz.com'")
        .custom(async (email) => {
        const user = await (0, queries_1.getUserByEmail)(email);
        if (!user)
            throw new Error("Email doesn't exists");
        return true;
    }),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage(`Password ${emptyError}`)
        .matches(/^\S*$/)
        .withMessage(`Passwords ${spaceError}`)
        .isLength({ min: 8 })
        .withMessage("Password be at least 8 characters long."),
];
exports.loginUser = [
    ...validateLogin,
    (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            res.sendStatus(200);
        }
        catch (error) {
            console.error("Could not login", error);
            res.sendStatus(400);
        }
    },
];
async function sendLoginErrors(err, req, res, next) {
    // Custom error handler for failed auth
    if (err.message === "Email not found." ||
        err.message === "Incorrect Password.") {
        return res.status(401).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong." });
}
//# sourceMappingURL=loginController.js.map