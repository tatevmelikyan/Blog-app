import LocalStrategy from "passport-local";
import passport from "passport";
import User from "../models/user.js";
import bcrypt from "bcrypt";

function configurePassport() {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (user === null) {
        return done(null, false, { message: "No user found with that email" });
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, "Login was successful");
      }
      return done(null, false, { message: "Incorrect password" });
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

export default configurePassport;
