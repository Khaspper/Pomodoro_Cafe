import { Router } from "express";
import "../config/passport";
import passport from "passport";
import { loginUser } from "../controllers/loginController";
import { sendLoginErrors } from "../controllers/loginController";
import { rateLimit } from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  skipSuccessfulRequests: true,

  keyGenerator: (req, _res) =>
    `${req.ip}:${(req.body?.username || "").toLowerCase()}`,

  handler: (req, res, _next, options) => {
    res.status(options.statusCode).json({
      error: "Too many login attempts. Try again in 5 minutes.",
    });
  },
});

const loginRouter = Router();

loginRouter.post(
  "/",
  loginLimiter,
  passport.authenticate("local", { failWithError: true }),
  sendLoginErrors,
  loginUser
);

export default loginRouter;
