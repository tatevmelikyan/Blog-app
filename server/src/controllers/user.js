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

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(200).send("User successfully created");
  } catch (err) {
    res.status(500).send("Failed to create user");
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.status(200).json(user);
    }
    throw new Error("User not found");
  } catch (err) {
    res.status(404).json(err);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    const [affectedRows] = await User.update(
      { firstName, lastName, email, password },
      {
        where: { id },
      }
    );
    if (affectedRows > 0) {
      return res.status(200).send("User updated successfully!");
    }
    res.status(404).send("User not found!");
  } catch (err) {
    res.status(500).json(err);
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
      return res.status(400).send({ info });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ info });
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
