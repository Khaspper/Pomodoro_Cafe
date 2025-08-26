import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Login " });
});

// Implement a
// I don't even know what I am trying to say up there LOL
loginRouter.post("/", (req: Request, res: Response, next) => {
  //! Mock User later update this to get the user and authenticate the user
  const user = {
    id: 1,
    username: "Khaspper",
    email: "abc@gmail.com",
  };
  //! Mock User later update this to get the user and authenticate the user
  console.log("Hiiii");
  jwt.sign(
    {
      user: user,
    },
    "secretKey",
    { expiresIn: "1d" },
    (err, token) => {
      if (err || !token)
        return next(err ?? new Error("JWT FAILED TOKEN CREATION FAILED"));
      res.json({ token });
    }
  );
});

export default loginRouter;
