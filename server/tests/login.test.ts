import request from "supertest";
import express from "express";
import session from "express-session";
import passport from "passport";
import loginRouter from "../src/routes/login";
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

app.use("/login", loginRouter);

describe("Login with valid/invalid credentials", () => {
  test("Should respond with 200 for valid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "qwer@example.com",
      password: "qweqweqwe",
    });
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with 401 for invalid --- Email ---", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@email.com",
      password: "qweqweqwe",
    });
    expect(response.statusCode).toBe(401);
  });

  test("Should respond with 401 for invalid --- Password ---", async () => {
    const response = await request(app).post("/login").send({
      email: "qwer@example.com",
      password: "IncorrectPassword",
    });
    expect(response.statusCode).toBe(401);
  });

  test("Should respond with 401 for invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@email.com",
      password: "IncorrectPassword",
    });
    expect(response.statusCode).toBe(401);
  });
});

describe("Validate login input", () => {
  test("Should respond with 'Email not found.'", async () => {
    const response = await request(app).post("/login").send({
      email: "nonexistent@email.com",
      password: "password",
    });

    expect(response.body.error).toBe("Email not found.");
  });

  test("Should respond with 'Incorrect Password.'", async () => {
    const response = await request(app).post("/login").send({
      email: "valid@email.com",
      password: "password",
    });

    expect(response.body.error).toBe("Incorrect Password.");
  });
});
