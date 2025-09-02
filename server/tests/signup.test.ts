import request from "supertest";
import express from "express";
import session from "express-session";
import passport from "passport";
import signupRouter from "../src/routes/signup";

// Things to mock
import { postNewUser } from "../src/db/queries";
import { validationResult } from "express-validator";

import "../src/config/passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/signup", signupRouter);

jest.mock("../src/db/queries", () => ({
  postNewUser: jest.fn(),
}));

jest.mock("express-validator", () => {
  const actual = jest.requireActual("express-validator");
  return {
    ...actual,
    validationResult: jest.fn(),
  };
});

describe("Sign up with valid credentials", () => {
  test("should respond with 201 for valid credentials", async () => {
    (postNewUser as unknown as jest.Mock).mockResolvedValue(null);
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: () => true,
    });

    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });
    expect(response.statusCode).toBe(201);
  });
});
