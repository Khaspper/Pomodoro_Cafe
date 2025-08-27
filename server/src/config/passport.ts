import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail } from "../db/queries";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    console.log(`email: ${email}`);
    console.log(`password: ${email}`);
    try {
      const user = await getUserByEmail(email);
      if (user === null) {
        throw new Error("User not found!!!!!");
      }
      //! Add bcrypt.compare!!!!
      if (user.password !== password) {
        throw new Error("Incorrect Password!!!!!");
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
