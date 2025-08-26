import type { Request, Response, NextFunction } from "express";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const { username, password } = req.body;
  req.user = {
    id: 1,
    username: req.body.username,
  };
  next();
}
