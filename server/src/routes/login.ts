import { Router } from "express";
import type { Request, Response } from "express";
import "../config/passport";
import passport from "passport";

const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Logged in successfully" });
  }
);

export default loginRouter;
