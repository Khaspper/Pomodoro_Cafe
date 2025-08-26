import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function createJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Hi");
  jwt.sign(
    {
      user: req.user,
    },
    "secretKey",
    { expiresIn: "1d" },
    (err, token) => {
      if (err || !token)
        return next(err ?? new Error("JWT FAILED TOKEN CREATION FAILED"));
      res.json({ token });
    }
  );
}
