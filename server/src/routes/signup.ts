import { Router } from "express";
import type { Request, Response } from "express";
import { addNewUser } from "../controllers/signupController";

const signupRouter = Router();

signupRouter.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Signup" });
});

// Apply both: per-IP + per-email
signupRouter.post("/", ...addNewUser);

export default signupRouter;
