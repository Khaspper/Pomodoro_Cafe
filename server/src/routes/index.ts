import { Router } from "express";
import type { Request, Response } from "express";
import { isAuthenticated } from "../controllers/accountController";
import { getCafes } from "../controllers/homeController";

const indexRouter = Router();

// Move these to controllers
indexRouter.get("/", getCafes);

indexRouter.get(
  "/api/authorized",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.json({ message: "Updated User..." });
  }
);

export default indexRouter;
