import passport from "passport";
import { Strategy } from "passport-local";

export default passport.use(
  new Strategy(async (username, password, done) => {
    // TODO: Implement authentication logic here
    // For now, just call done with null user (authentication fails)
    return done(null, false);
  })
);
