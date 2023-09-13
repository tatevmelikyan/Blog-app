import User from "../models/user.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  const {password, ...user} = req.user.dataValues
 res.status(200).json({user})
}

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.validatedPayload;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User successfully created"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserName = async (req, res) => {
  try {
    const { validatedPayload } = req;
    const updatedUser = await req.user.update(validatedPayload);
    const { password, ...updatedUserInfo } = updatedUser.dataValues;
    res.status(200).json({ message: "User's name updated successfully", user: updatedUserInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserContactInfo = async (req, res) => {
  try {
    const { validatedPayload } = req;
    const updatedUser = await req.user.update(validatedPayload);
    const { password, ...updatedUserInfo } = updatedUser.dataValues;
    res
      .status(200)
      .json({ message: "User contact information updated successfully", user: updatedUserInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { validatedPayload } = req;

    if (await bcrypt.compare(validatedPayload.currentPassword, req.user.password)) {
      const hashedPassword = await bcrypt.hash(validatedPayload.newPassword, 10);
      await req.user.update({ password: hashedPassword });

      return req.logout((err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Password changed successfully. User logged out." });
      });
    }
    res.status(403).json({ message: "Current password is incorrect" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await req.user.destroy();
    res.status(200).json({ message: "User successfully deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(403).json({ message: info });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const { password, ...userInfo } = user.dataValues;
      return res.status(200).json({ message: info, user: userInfo });
    });
  })(req, res, next);
};

export const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
};
