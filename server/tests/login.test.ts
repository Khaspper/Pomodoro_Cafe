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

  test("Should respond with 401 for invalid credentials --- Email ---", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@email.com",
      password: "qweqweqwe",
    });
    expect(response.statusCode).toBe(401);
  });
});
