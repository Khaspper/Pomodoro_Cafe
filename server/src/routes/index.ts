import { Router } from "express";
import type { Request, Response } from "express";
import { isAuthenticated } from "../controllers/accountController";

const indexRouter = Router();

// Move these to controllers
indexRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "This is the index page" });
});

indexRouter.get(
  "/api/authorized",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.json({ message: "Updated User..." });
  }
);

export default indexRouter;
