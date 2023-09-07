import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUserName,
  deleteUser,
  loginUser,
  logoutUser,
  changeUserPassword,
  updateUserContactInfo,
} from "../controllers/user.js";
import { checkAuthenticated, checkNotAuthenticated } from "../utils/checkAuthentication.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.post("/login", checkNotAuthenticated, loginUser);
router.delete("/logout", checkAuthenticated, logoutUser);
router.post("/users", checkNotAuthenticated, createUser);

router.put("/user/update-name", checkAuthenticated, updateUserName);
router.put("/user/update-contact-info", checkAuthenticated, updateUserContactInfo)
router.put("/user/change-password", checkAuthenticated, changeUserPassword)

router.delete("/user/delete", checkAuthenticated, deleteUser);



export default router;
