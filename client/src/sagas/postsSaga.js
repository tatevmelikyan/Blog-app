import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../features/posts/postsSlice";

function fetchGetAllPosts() {
  const apiUrl = "http://localhost:5000/posts";
  return fetch(apiUrl).then((res) =>  res.json());
}

function* handleGetAllPosts() {
  try {
    const posts = yield call(fetchGetAllPosts);
    yield put({ type: actionTypes.GET_ALL_POSTS_SUCCEEDED, payload: { posts } });
  } catch (err) {
    yield put({ type: actionTypes.GET_ALL_POSTS_FAILED, payload: { error: err.message } });
  }
}

function* watcherPostsSaga() {
  yield takeLatest(actionTypes.GET_ALL_POSTS_REQUESTED, handleGetAllPosts);
}

export default watcherPostsSaga;
