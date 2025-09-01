import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail, getUserById } from "../db/queries";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(Number(id));
    if (user === null) {
      throw new Error("User was not found");
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (user === null) {
        throw new Error("Email not found.");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Incorrect Password.");
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
