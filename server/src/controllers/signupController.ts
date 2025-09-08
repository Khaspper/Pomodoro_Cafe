import type { Request, Response, NextFunction } from "express";
import { postNewUser } from "../db/queries";
import { body, validationResult } from "express-validator";
import { getUserByEmail, getUserByUsername } from "../db/queries";

const emptyError = "cannot be empty.";
const spaceError = "cannot contain spaces.";

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyError}`)
    .not()
    .contains(" ")
    .withMessage(`Username ${spaceError}`)
    .isAlphanumeric()
    .withMessage(`Username can only contain Alphanumeric characters.`)
    .custom(async (username) => {
      if (await getUserByUsername(username))
        throw new Error("User already exists");
      return true;
    })
    .isLength({ min: 5, max: 12 })
    .withMessage("Username must be between 5 and 12 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyError}`)
    .isEmail()
    .withMessage("Email must be in this format 'abc@xyz.com'")
    .custom(async (email) => {
      if (await getUserByEmail(email)) throw new Error("Email already exists.");
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyError}`)
    .matches(/^\S*$/)
    .withMessage(`Passwords ${spaceError}`)
    .isLength({ min: 8 })
    .withMessage("Password be at least 8 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

export function checkForErrors(req: Request) {
  return validationResult(req);
}

export const addNewUser = [
  validateSignup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = checkForErrors(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const response = await postNewUser(req.body);
      if (!response) {
        return res.status(201).send(req.body);
      }
      req.login(req.body, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(201);
      });
      throw response;
    } catch (error) {
      console.error("Could not create users", error);
      res.sendStatus(400);
    }
  },
];
