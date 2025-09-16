import { Router } from "express";
import { isAuthenticated, logout } from "../controllers/accountController";

const accountRouter = Router();

accountRouter.get("/", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

accountRouter.post("/", isAuthenticated, (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username);
  console.log(email);
  console.log(password);
});

accountRouter.post("/logout", isAuthenticated, logout);

export default accountRouter;
