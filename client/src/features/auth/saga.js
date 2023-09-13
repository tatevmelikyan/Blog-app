import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUESTED,
  LOGIN_USER_SUCCEEDED,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUESTED,
  LOGOUT_USER_SUCCEEDED,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUESTED,
  REGISTER_USER_SUCCEEDED,
} from "./constants";

async function fetchLoginUser(email, password) {
  const apiUrl = "http://localhost:5000/login";
  try {
    const response = await axios.post(apiUrl, { email, password }, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleLoginUser(action) {
  const { email, password } = action.payload;
  try {
    const { user } = yield call(fetchLoginUser, email, password);
    yield put({ type: LOGIN_USER_SUCCEEDED, payload: { user } });
  } catch (err) {
    yield put({
      type: LOGIN_USER_FAILED,
      payload: { message: err.response.data.message.message },
    });
  }
}

async function fetchLogoutUser() {
  const apiUrl = "http://localhost:5000/logout";
  try {
    const response = await axios.delete(apiUrl, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleLogoutUser(action) {
  try {
    const response = yield call(fetchLogoutUser);
    yield put({ type: LOGOUT_USER_SUCCEEDED, payload: { response } });
  } catch (err) {
    yield put({
      type: LOGOUT_USER_FAILED,
      payload: { message: err.response.data.message.message },
    });
  }
}

async function fetchRegisterUser(payload) {
  const apiUrl = "http://localhost:5000/users";
  try {
    const response = await axios.post(apiUrl, payload, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleRegisterUser(action) {
  try {
    const { user } = yield call(fetchRegisterUser, action.payload);
    yield put({ type: REGISTER_USER_SUCCEEDED, payload: { user } });
  } catch (err) {
    yield put({
      type: REGISTER_USER_FAILED,
      payload: { message: err.response.data.message.message },
    });
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_USER_REQUESTED, handleLoginUser);
  yield takeLatest(LOGOUT_USER_REQUESTED, handleLogoutUser);
  yield takeLatest(REGISTER_USER_REQUESTED, handleRegisterUser);
}
