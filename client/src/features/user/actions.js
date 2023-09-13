import { GET_USER_REQUESTED } from "./constants";

export function getUser() {
  return { type: GET_USER_REQUESTED };
}
