import {
  LOGIN_USER_REQUESTED,
  LOGIN_USER_SUCCEEDED,
  LOGOUT_USER_REQUESTED,
  REGISTER_USER_REQUESTED,
} from "./constants";

export function loginUser(payload) {
  return { type: LOGIN_USER_REQUESTED, payload };
}
export function logoutUser() {
  return { type: LOGOUT_USER_REQUESTED };
}
export function registerUser(payload) {
  return { type: REGISTER_USER_REQUESTED, payload };
}

export function loginUserSuccess() {
  return { type: LOGIN_USER_SUCCEEDED };
}
