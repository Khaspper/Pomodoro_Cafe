import type { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request) {
  return req.isAuthenticated() ? true : false;
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.send(401);
  }
  req.logOut((error) => {
    if (error) return res.sendStatus(400);
    res.sendStatus(200);
  });
}
