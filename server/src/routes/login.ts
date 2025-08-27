import { Router } from "express";
import type { Request, Response } from "express";
import { authorizeUser } from "../controllers/loginController";
import { createJWT } from "../controllers/jwt";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Login " });
});

// Implement a
// I don't even know what I am trying to say up there LOL
loginRouter.post("/", authorizeUser, createJWT);

export default loginRouter;
