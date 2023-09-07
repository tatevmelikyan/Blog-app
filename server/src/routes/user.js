import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUserName,
  deleteUser,
  loginUser,
  logoutUser,
  changeUserPassword,
  updateUserContactInfo,
} from "../controllers/user.js";
import { checkAuthenticated, checkNotAuthenticated } from "../utils/checkAuthentication.js";

import {
  validate,
  validateSignupPayload,
  validateUserContactInfoPayload,
  validateUserNamePayload,
  validateUserPasswordPayload,
} from "../utils/validator.js";

const router = Router();

router.get("/users", getUsers);

router.post("/login", checkNotAuthenticated, loginUser);
router.delete("/logout", checkAuthenticated, logoutUser);
router.post("/users", checkNotAuthenticated, validate(validateSignupPayload), createUser);

router.put(
  "/user/update-name",
  checkAuthenticated,
  validate(validateUserNamePayload),
  updateUserName
);
router.put(
  "/user/update-contact-info",
  checkAuthenticated,
  validate(validateUserContactInfoPayload),
  updateUserContactInfo
);
router.put(
  "/user/change-password",
  checkAuthenticated,
  validate(validateUserPasswordPayload),
  changeUserPassword
);

router.delete("/user/delete", checkAuthenticated, deleteUser);

export default router;
