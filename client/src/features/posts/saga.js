import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_POSTS_FAILED,
  GET_ALL_POSTS_REQUESTED,
  GET_ALL_POSTS_SUCCEEDED,
  GET_LIKED_POSTS_FAILED,
  GET_LIKED_POSTS_REQUESTED,
  GET_LIKED_POSTS_SUCCEEDED,
  GET_USER_POSTS_FAILED,
  GET_USER_POSTS_REQUESTED,
  GET_USER_POSTS_SUCCEEDED,
  LIKE_POST_FAILED,
  LIKE_POST_REQUESTED,
  LIKE_POST_SUCCEEDED,
  UNLIKE_POST_FAILED,
  UNLIKE_POST_REQUESTED,
  UNLIKE_POST_SUCCEEDED,
} from "./constants";

async function fetchGetAllPosts() {
  const apiUrl = "http://localhost:5000/posts";
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleGetAllPosts() {
  try {
    const posts = yield call(fetchGetAllPosts);
    yield put({ type: GET_ALL_POSTS_SUCCEEDED, payload: { posts } });
  } catch (err) {
    yield put({ type: GET_ALL_POSTS_FAILED, payload: { error: err.message } });
  }
}

async function getLikedPosts() {
  const apiUrl = "http://localhost:5000/liked-posts";
  try {
    const response = await axios.get(apiUrl, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleGetLikedPosts() {
  try {
    const likedPosts = yield call(getLikedPosts);
    yield put({ type: GET_LIKED_POSTS_SUCCEEDED, payload: { likedPosts } });
  } catch (err) {
    yield put({
      type: GET_LIKED_POSTS_FAILED,
      payload: err.response.data.message,
    });
  }
}

async function getUserPosts() {
  const apiUrl = "http://localhost:5000/user/posts";
  try {
    const response = await axios.get(apiUrl, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}

function* handleGetUserPosts() {
  try {
    const userPosts = yield call(getUserPosts);
    yield put({ type: GET_USER_POSTS_SUCCEEDED, payload: { userPosts } });
  } catch (err) {
    yield put({
      type: GET_USER_POSTS_FAILED,
      payload: err.response.data.message,
    });
  }
}

async function likePost(payload) {
  const apiUrl = `http://localhost:5000/posts/${payload.postId}/like`;
  try {
    const response = await axios.post(apiUrl, undefined, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}

function* handleLikePost(action) {
  try {
    const response = yield call(likePost, action.payload);
    yield put({ type: LIKE_POST_SUCCEEDED, payload: action.payload });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILED,
      payload: err.response.data,
    });
  }
}

async function unLikePost(payload) {
  const apiUrl = `http://localhost:5000/posts/${payload.postId}/unlike`;
  try {
    const response = await axios.delete(apiUrl, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}

function* handleUnLikePost(action) {
  try {
    const response = yield call(unLikePost, action.payload);
    yield put({ type: UNLIKE_POST_SUCCEEDED, payload: action.payload });
  } catch (err) {
    console.log(err);
    yield put({
      type: UNLIKE_POST_FAILED,
      payload: err.response.data,
    });
  }
}

function* watchPostsSaga() {
  yield takeLatest(GET_ALL_POSTS_REQUESTED, handleGetAllPosts);
  yield takeLatest(GET_LIKED_POSTS_REQUESTED, handleGetLikedPosts);
  yield takeLatest(GET_USER_POSTS_REQUESTED, handleGetUserPosts);
  yield takeLatest(LIKE_POST_REQUESTED, handleLikePost);
  yield takeLatest(UNLIKE_POST_REQUESTED, handleUnLikePost);
}

export default watchPostsSaga;
