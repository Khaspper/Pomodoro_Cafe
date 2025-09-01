import { Router } from "express";
import type { Request, Response } from "express";
import { isAuthenticated } from "../controllers/account";

const indexRouter = Router();

// Move these to controllers
indexRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "This is the index page" });
});

indexRouter.get("/api/authorized", (req: Request, res: Response) => {
  if (isAuthenticated(req)) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

export default indexRouter;
