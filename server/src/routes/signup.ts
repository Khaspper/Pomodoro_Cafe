import { Router } from "express";
import type { Request, Response } from "express";

const signupRouter = Router();

signupRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Signup " });
});

// Implement a
// I don't even know what I am trying to say up there LOL
signupRouter.post("/", (req: Request, res: Response) => {
  res.status(201).send(req.body);
});

export default signupRouter;
