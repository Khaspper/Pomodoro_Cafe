import { Router } from "express";
import { isAuthenticated, logout } from "../controllers/accountController";

const accountRouter = Router();

accountRouter.get("/", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "Updated User..." });
});

accountRouter.post("/logout", logout);

export default accountRouter;
