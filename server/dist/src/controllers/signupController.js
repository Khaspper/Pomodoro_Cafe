"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewUser = void 0;
exports.checkForErrors = checkForErrors;
const queries_1 = require("../db/queries");
const express_validator_1 = require("express-validator");
const queries_2 = require("../db/queries");
const emptyError = "cannot be empty.";
const spaceError = "cannot contain spaces.";
const validateSignup = [
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .withMessage(`Username ${emptyError}`)
        .not()
        .contains(" ")
        .withMessage(`Username ${spaceError}`)
        .isAlphanumeric()
        .withMessage(`Username can only contain Alphanumeric characters.`)
        .custom(async (username) => {
        if (await (0, queries_2.getUserByUsername)(username))
            throw new Error("User already exists");
        return true;
    })
        .isLength({ min: 5, max: 12 })
        .withMessage("Username must be between 5 and 12 characters"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage(`Email ${emptyError}`)
        .isEmail()
        .withMessage("Email must be in this format 'abc@xyz.com'")
        .custom(async (email) => {
        if (await (0, queries_2.getUserByEmail)(email))
            throw new Error("Email already exists.");
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
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    }),
];
function checkForErrors(req) {
    return (0, express_validator_1.validationResult)(req);
}
exports.addNewUser = [
    validateSignup,
    async (req, res, next) => {
        try {
            const errors = checkForErrors(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            const response = await (0, queries_1.postNewUser)(req.body);
            if (!response) {
                return res.status(201).send(req.body);
            }
            req.login(req.body, (err) => {
                if (err) {
                    return next(err);
                }
                res.sendStatus(201);
            });
        }
        catch (error) {
            console.error("Could not create users", error);
            res.sendStatus(400);
        }
    },
];
//# sourceMappingURL=signupController.js.map