import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool";

// Routes
import indexRouter from "./routes";
import loginRouter from "./routes/login";
import signupRouter from "./routes/signup";
import accountRouter from "./routes/Account";
import cafeRouter from "./routes/cafe";
import passport from "passport";
import morgan from "morgan";
import healthRouter from "./routes/health";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set("trust proxy", 1);

// This is so we can send data to our front end
const corsOptions = {
  origin: [
    "www.pomodorocafes.com",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  credentials: true,
};
// TODO: Replace hardcoded localhost URLs with environment variables
// TODO: Add production URLs to CORS origins
app.use(cors(corsOptions));
// This is so we can send data to our front end

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new (connectPgSimple(session))({
      pool: pool,
      tableName: "session",
    }),
    secret: String(process.env.SECRET_KEY),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // required over HTTPS
      sameSite: "none", // required for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.session());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/account", accountRouter);
app.use("/cafe", cafeRouter);
app.use("/health", healthRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// // TODO: I have to validate all inputs
// // TODO: Validate the Review cafe section
// // TODO: and the account page
// // TODO: I also have to implement a update account part...
// TODO: Finally style the page professionally...
// // TODO: Make the screen scrollable when it overflows y axis
// // TODO: Date/Time formatting
// // TODO: Change the loading thing
// // TODO: google form
// // TODO: Add rate limiting middleware
// // TODO: Add request logging middleware
// // TODO: Add health check endpoint
// // TODO: Add proper error handling middleware
