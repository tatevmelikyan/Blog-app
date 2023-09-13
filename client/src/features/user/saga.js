import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";
import { GET_USER_FAILED, GET_USER_REQUESTED, GET_USER_SUCCEEDED } from "./constants";

async function getUser() {
  const apiUrl = "http://localhost:5000/user";
  try {
    const response = await axios.get(apiUrl, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleGetUser() {
  try {
    const { user } = yield call(getUser);
    yield put({ type: GET_USER_SUCCEEDED, payload: { user } });
  } catch (err) {
    yield put({
      type: GET_USER_FAILED,
      payload: err.response.data.message,
    });
  }
}

export default function* watchUserSaga() {
  yield takeLatest(GET_USER_REQUESTED, handleGetUser);
}
