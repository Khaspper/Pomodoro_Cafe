import request from "supertest";
import express from "express";
import session from "express-session";
import passport from "passport";
import signupRouter from "../src/routes/signup";

// Things to mock
import {
  postNewUser,
  getUserByEmail,
  getUserByUsername,
} from "../src/db/queries";
import * as SC from "../src/controllers/signupController";

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
  postNewUser: jest.fn().mockResolvedValue(null),
  getUserByEmail: jest.fn().mockResolvedValue(false),
  getUserByUsername: jest.fn().mockResolvedValue(false),
}));

describe("Sign up with valid credentials", () => {
  test("should respond with 201 for valid credentials", async () => {
    const spy = jest.spyOn(SC, "checkForErrors");

    spy.mockReturnValue({
      isEmpty: () => true,
    } as any);

    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });
    spy.mockRestore();
    expect(response.statusCode).toBe(201);
  });
});

describe("Sign up with invalid credentials for username", () => {
  beforeEach(() => {
    (postNewUser as unknown as jest.Mock).mockResolvedValue(null);
    (getUserByEmail as unknown as jest.Mock).mockResolvedValue(false);
    (getUserByUsername as unknown as jest.Mock).mockResolvedValue(false);
  });

  test("should respond with 'Username cannot be empty.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response.body.errors[0].msg).toBe("Username cannot be empty.");
  });

  test("should respond with 'Username cannot contain spaces.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "no spaces",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response.body.errors[0].msg).toBe("Username cannot contain spaces.");
  });

  test("should respond with 'Username can only contain Alphanumeric characters.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "%%%%%%!)(*!)*#)(@**#_$(_!$*()@",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response.body.errors[0].msg).toBe(
      "Username can only contain Alphanumeric characters."
    );
  });

  test("should respond with 'User already exists'", async () => {
    (getUserByUsername as unknown as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post("/signup").send({
      username: "khaspper",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response.body.errors[0].msg).toBe("User already exists");
  });

  test("should respond with 'Username must be between 5 and 12 characters'", async () => {
    const response1 = await request(app).post("/signup").send({
      username: "kh",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    const response2 = await request(app).post("/signup").send({
      username: "overTwelveCharacters",
      email: "valid@email.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response1.body.errors[0].msg).toBe(
      "Username must be between 5 and 12 characters"
    );

    expect(response2.body.errors[0].msg).toBe(
      "Username must be between 5 and 12 characters"
    );
  });
});

describe("Sign up with invalid credentials for email", () => {
  beforeEach(() => {
    (postNewUser as unknown as jest.Mock).mockResolvedValue(null);
    (getUserByEmail as unknown as jest.Mock).mockResolvedValue(false);
    (getUserByUsername as unknown as jest.Mock).mockResolvedValue(false);
  });

  test("Should respond with 'Email cannot be empty.", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "",
      password: "validPassword",
      confirmPassword: "validPassword",
    });
    expect(response.body.errors[0].msg).toBe("Email cannot be empty.");
  });

  test("Should respond with 'Email must be in this format 'abc@xyz.com''", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "notValidEmail",
      password: "validPassword",
      confirmPassword: "validPassword",
    });
    expect(response.body.errors[0].msg).toBe(
      "Email must be in this format 'abc@xyz.com'"
    );
  });

  test("Should respond with 'Email already exists.'", async () => {
    (getUserByEmail as unknown as jest.Mock).mockReturnValue(true);
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "email@exists.com",
      password: "validPassword",
      confirmPassword: "validPassword",
    });

    expect(response.body.errors[0].msg).toBe("Email already exists.");
  });
});

describe("Sign up with invalid credentials for password", () => {
  beforeEach(() => {
    (postNewUser as unknown as jest.Mock).mockResolvedValue(null);
    (getUserByEmail as unknown as jest.Mock).mockResolvedValue(false);
    (getUserByUsername as unknown as jest.Mock).mockResolvedValue(false);
  });

  test("Should respond with 'Password cannot be empty.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "email@exists.com",
      password: "",
      confirmPassword: "",
    });

    expect(response.body.errors[0].msg).toBe("Password cannot be empty.");
  });

  test("Should respond with 'Password cannot contain spaces.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "email@exists.com",
      password: "Has Spaces",
      confirmPassword: "Has Spaces",
    });

    expect(response.body.errors[0].msg).toBe(
      "Passwords cannot contain spaces."
    );
  });

  test("Should respond with 'Password be at least 8 characters long.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "email@exists.com",
      password: "123",
      confirmPassword: "123",
    });

    expect(response.body.errors[0].msg).toBe(
      "Password be at least 8 characters long."
    );
  });

  test("Should respond with 'Passwords do not match.'", async () => {
    const response = await request(app).post("/signup").send({
      username: "validUser",
      email: "email@exists.com",
      password: "doNotMatch",
      confirmPassword: "doMatch",
    });

    expect(response.body.errors[0].msg).toBe("Passwords do not match.");
  });
});
