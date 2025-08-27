import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
// Routes
import indexRouter from "./routes";
import loginRouter from "./routes/login";
import signupRouter from "./routes/signup";
import accountRouter from "./routes/account";

const app = express();
const PORT = 3000;

// This is so we can send data to our front end
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173"],
};
app.use(cors(corsOptions));
// This is so we can send data to our front end

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/account", accountRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes (e.g., to a file or console)
  console.error(err.stack);

  // Set the status code for the response
  const statusCode = 500; // Use custom status if available, otherwise default to 500 (Internal Server Error)

  // Send a JSON response to the client
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Something went wrong!", // Use custom message if available
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
