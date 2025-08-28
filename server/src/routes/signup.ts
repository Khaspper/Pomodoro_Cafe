import { Router } from "express";
import type { Request, Response } from "express";
import { addNewUser } from "../controllers/signupController";

const signupRouter = Router();

signupRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Signup " });
});

// Implement a
// I don't even know what I am trying to say up there LOL
signupRouter.post("/", ...addNewUser);

export default signupRouter;
