import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail, getUserById } from "../db/queries";

passport.serializeUser((user, done) => {
  console.log("inside serializeUser");
  console.log("user:");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside DeserializeUser");
  console.log(`id: ${id}`);
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
