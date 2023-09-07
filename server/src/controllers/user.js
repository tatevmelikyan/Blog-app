import User from "../models/user.js";
import bcrypt from "bcrypt";
import passport from "passport";
import {
  validateSignupPayload,
  validateUserContactInfoPayload,
  validateUserNamePayload,
  validateUserPasswordPayload,
} from "../utils/validator.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req, res) => {
  let validatedValue;
  try {
    validatedValue = await validateSignupPayload(req.body);
  } catch (err) {
    return res.status(403).send(err.details);
  }

  const { firstName, lastName, email, password } = validatedValue;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const { password: newUserPassword, ...newUserInfo } = newUser.dataValues;
    res.status(200).json({ message: "User successfully created", user: newUserInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateUserName = async (req, res) => {
  let validatedValue;
  try {
    validatedValue = await validateUserNamePayload(req.body);
  } catch (err) {
    return res.status(403).send(err.details);
  }
  try {
    const updatedUser = await req.user.update(validatedValue);
    const { password, ...updatedUserInfo } = updatedUser.dataValues;
    return res
      .status(200)
      .json({ message: "User name updated successfully", user: updatedUserInfo });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUserContactInfo = async (req, res) => {
  let validatedValue;
  try {
    validatedValue = await validateUserContactInfoPayload(req.body);
  } catch (err) {
    return res.status(403).send(err.details);
  }

  try {
    const updatedUser = await req.user.update(validatedValue);
    const { password, ...updatedUserInfo } = updatedUser.dataValues;
    res
      .status(200)
      .json({ message: "User contact information updated successfully", user: updatedUserInfo });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const changeUserPassword = async (req, res) => {
  let validatedValue;
  try {
    validatedValue = await validateUserPasswordPayload(req.body);
  } catch (err) {
    return res.status(403).send(err.details);
  }

  try {
    if (await bcrypt.compare(validatedValue.currentPassword, req.user.password)) {
      const hashedPassword = await bcrypt.hash(validatedValue.newPassword, 10);
      req.user.password = hashedPassword;
      await req.user.save();
      return req.logout((err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send("Password changed successfully. User logged out.");
      });
    }
    res.status(403).send("Current password is incorrect");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: { id },
    });
    res.status(200).json("User successfully deleted!");
  } catch (err) {
    res.status(500).json("Failed to delete user!");
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(403).send({ info });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: info });
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
