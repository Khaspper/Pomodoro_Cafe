import { Router } from "express";
import "../config/passport";
import passport from "passport";
import { loginUser } from "../controllers/loginController";
import { sendLoginErrors } from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post(
  "/",
  passport.authenticate("local", { failWithError: true }),
  loginUser,
  sendLoginErrors
);

export default loginRouter;
