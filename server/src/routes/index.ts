import { Router } from "express";
import type { Request, Response } from "express";
import { isAuthenticated } from "../controllers/accountController.js";

const indexRouter = Router();

indexRouter.get(
  "/api/authorized",
  isAuthenticated,
  (req: Request, res: Response) => {
    res.json({ message: "Updated User..." });
  }
);

export default indexRouter;
