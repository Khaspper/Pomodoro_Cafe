import { Router } from "express";
import type { Request, Response } from "express";
import { addNewUser } from "../controllers/signupController";
import { rateLimit } from "express-rate-limit";

const signupRouter = Router();

// Per-IP limiter: stops one network from flooding signups
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // allow 100 signups per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many signups from this network. Try again later.",
    retryAfter: "15 minutes",
  },
});

// Per-email limiter: 1 successful signup per email per 15m
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1,
  keyGenerator: (req) => (req.body?.email || "").toLowerCase(),
  skipFailedRequests: true, // only count successful 2xx/3xx
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many signups for this email. Try again later.",
    retryAfter: "15 minutes",
  },
});

signupRouter.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Signup" });
});

// Apply both: per-IP + per-email
signupRouter.post("/", ipLimiter, emailLimiter, ...addNewUser);

export default signupRouter;
