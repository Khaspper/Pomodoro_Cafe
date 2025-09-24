import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  getUserByEmail,
  getUserByUsername,
  updateEmail,
  updatePassword,
  updateUsername,
} from "../db/queries.js";

const spaceError = "cannot contain spaces.";

const validateSignup = [
  body("username")
    .trim()
    .not()
    .contains(" ")
    .withMessage(`Username ${spaceError}`)
    .isAlphanumeric()
    .withMessage(`Username can only contain Alphanumeric characters.`)
    .custom(async (username, { req }) => {
      if ((await getUserByUsername(username)) && username !== req.user.username)
        throw new Error("User already exists");
      return true;
    })
    .isLength({ min: 5, max: 12 })
    .withMessage("Username must be between 5 and 12 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be in this format 'abc@xyz.com'")
    .custom(async (email, { req }) => {
      if ((await getUserByEmail(email)) && email !== req.user.email)
        throw new Error("Email already exists.");
      return true;
    }),
  body("password")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\S*$/)
    .withMessage(`Passwords ${spaceError}`)
    .isLength({ min: 8 })
    .withMessage("Password be at least 8 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    // only check if password was provided
    if (req.body.password && req.body.password.trim() !== "") {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
    }
    return true;
  }),
];

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.sendStatus(401);
}

export async function logout(req: Request, res: Response, next: NextFunction) {
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

export function checkForErrors(req: Request) {
  return validationResult(req);
}

export const updateAccount = [
  ...validateSignup,
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = checkForErrors(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      if (req.user && req.user.username !== req.body.username) {
        await updateUsername(req.user.username, req.body.username);
      }
      if (req.user && req.user.email !== req.body.email) {
        await updateEmail(req.user.email, req.body.email);
      }
      if (req.user && req.body.password !== "") {
        await updatePassword(req.user.id, req.body.password);
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Something went wrong updating the account.", error);
    }
  },
];
