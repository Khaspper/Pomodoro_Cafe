import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getUserByEmail } from "../db/queries";

const emptyError = "cannot be empty.";
const spaceError = "cannot contain spaces.";

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyError}`)
    .isEmail()
    .withMessage("email must be in this format 'abc@xyz.com'")
    .custom(async (email) => {
      const user = await getUserByEmail(email);
      if (!user) throw new Error("Email doesn't exists");
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
];

export const loginUser = [
  ...validateLogin,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Could not login", error);
      res.sendStatus(400);
    }
  },
];

export async function sendLoginErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Custom error handler for failed auth
  if (
    err.message === "Email not found." ||
    err.message === "Incorrect Password."
  ) {
    return res.status(401).json({ error: err.message });
  }
  return res.status(500).json({ error: "Something went wrong." });
}
