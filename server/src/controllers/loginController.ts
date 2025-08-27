import type { Request, Response, NextFunction } from "express";
import "../config/passport";

export async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;
  console.log("username");
  console.log(username);
  console.log("password");
  console.log(password);
  next();
}
