import {
  GET_ALL_POSTS_REQUESTED,
  GET_LIKED_POSTS_REQUESTED,
  GET_USER_POSTS_REQUESTED,
  LIKE_POST_REQUESTED,
  UNLIKE_POST_REQUESTED,
} from "./constants";

export function getAllPosts() {
  return { type: GET_ALL_POSTS_REQUESTED };
}

export function getLikedPosts() {
  return { type: GET_LIKED_POSTS_REQUESTED };
}

export function getUserPosts() {
  return { type: GET_USER_POSTS_REQUESTED };
}

export function likePost(payload) {
  return { type: LIKE_POST_REQUESTED, payload };
}

export function unLikePost(payload) {
  return { type: UNLIKE_POST_REQUESTED, payload };
}
