import { all } from "redux-saga/effects";
import watchPostsSaga from "../features/posts/saga";
import watchUserSaga from "../features/user/saga";
import watchAuthSaga from "../features/auth/saga";

export default function* rootSaga() {
  yield all([watchPostsSaga(), watchAuthSaga(), watchUserSaga()]);
}
