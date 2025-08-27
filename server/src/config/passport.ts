import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByUsername } from "../db/queries";

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
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
