import { Router } from "express";
import { verifyToken } from "../controllers/jwt";

const accountRouter = Router();

accountRouter.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Updated User...",
  });
});

export default accountRouter;
