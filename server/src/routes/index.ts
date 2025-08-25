import { Router } from "express";
import type { Request, Response } from "express";

const indexRouter = Router();

// Move these to controllers
indexRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "This is the index page" });
});

export default indexRouter;
