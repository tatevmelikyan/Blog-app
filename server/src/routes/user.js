import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/user.js";
import { checkAuthenticated, checkNotAuthenticated } from "../utils/checkAuthentication.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/login", checkNotAuthenticated, loginUser);
router.delete("/logout", checkAuthenticated, logoutUser);

export default router;
