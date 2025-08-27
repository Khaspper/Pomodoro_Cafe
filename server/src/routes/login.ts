import { Router } from "express";
import type { Request, Response } from "express";
import "../config/passport";
import passport from "passport";
// import { authorizeUser } from "../controllers/loginController";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Login " });
});

// Implement login POST route using passport's 'local' strategy
loginRouter.post(
  "/",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.json({ message: "Logged in successfully" });
  }
);

export default loginRouter;
