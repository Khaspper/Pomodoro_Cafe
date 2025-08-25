import { Router } from "express";
import type { Request, Response } from "express";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Login " });
});

// Implement a
// I don't even know what I am trying to say up there LOL
loginRouter.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).send(req.body);
});

export default loginRouter;
