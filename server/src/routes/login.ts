import { Router } from "express";
import "../config/passport.js";
import passport from "passport";
import { loginUser, sendLoginErrors } from "../controllers/loginController.js";
const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local", { failWithError: true }),
  sendLoginErrors,
  loginUser
);

export default loginRouter;
