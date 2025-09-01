import login from "../src/routes/login";
import request from "supertest";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", login);

test("login route works", (done) => {
  request(app)
    .post("/")
    .expect("Content-Type", /json/)
    .expect({ name: "frodo" })
    .expect(200, done);
});
