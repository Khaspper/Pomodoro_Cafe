import { Router } from "express";
import "../config/passport";
import passport from "passport";
import { loginUser } from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post("/", passport.authenticate("local"), loginUser);

export default loginRouter;
