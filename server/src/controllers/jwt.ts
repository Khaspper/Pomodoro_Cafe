import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export async function createJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  jwt.sign(
    {
      user: req.user,
    },
    String(SECRET_KEY),
    { expiresIn: "1d" },
    (err, token) => {
      if (err || !token)
        return next(err ?? new Error("JWT FAILED TOKEN CREATION FAILED"));
      res.json({ token });
    }
  );
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
  next();
}

export default async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  jwt.verify(String(req.token), String(SECRET_KEY), (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "User is authenticated", authData });
    }
  });
}
