import { Router } from "express";
import type { Request, Response } from "express";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Login " });
});

// Implement a
loginRouter.post("/a", (req: Request, res: Response) => {
  console.log("Success");
  setTimeout(() => {
    res.sendStatus(201);
  }, 2000);
});

export default loginRouter;
