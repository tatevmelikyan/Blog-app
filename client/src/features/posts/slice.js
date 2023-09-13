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

const initialState = {
  posts: [],
  isGetAllPostsRequest: false,
  isGetAllPostsSuccess: false,
  isGetAllPostsFailure: false,

  isGetLikedPostsRequest: false,
  isGetLikedPostsSuccess: false,
  isGetLikedPostsFailure: false,

  isGetUserPostsRequest: false,
  isGetUserPostsSuccess: false,
  isGetUserPostsFailure: false,

  isLikePostRequest: false,
  isLikePostSuccess: false,
  isLikePostFailure: false,

  isUnLikePostRequest: false,
  isUnLikePostSuccess: false,
  isUnLikePostFailure: false,

  likedPosts: [],
  userPosts: [],
  error: null,
};

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS_REQUESTED:
      return {
        ...state,
        isGetAllPostsRequest: true,
        isGetAllPostsSuccess: false,
        isGetAllPostsFailure: false,
        error: null,
      };
    case GET_ALL_POSTS_SUCCEEDED:
      const { posts } = action.payload;
      return {
        ...state,
        posts,
        isGetAllPostsRequest: false,
        isGetAllPostsSuccess: true,
      };
    case GET_ALL_POSTS_FAILED:
      return {
        ...state,
        isGetAllPostsRequest: false,
        isGetAllPostsFailure: true,
        error: action.payload.message,
      };

    // GET LIKED POSTS
    case GET_LIKED_POSTS_REQUESTED:
      return {
        ...state,
        isGetLikedPostsRequest: true,
        isGetLikedPostsSuccess: false,
        isGetLikedPostsFailure: false,
      };

    case GET_LIKED_POSTS_SUCCEEDED:
      const { likedPosts } = action.payload;
      return {
        ...state,
        isGetLikedPostsRequest: false,
        isGetLikedPostsSuccess: true,
        likedPosts: [...likedPosts],
      };

    case GET_LIKED_POSTS_FAILED:
      return {
        ...state,
        isGetLikedPostsRequest: false,
        isGetLikedPostsFailure: true,
        error: action.payload.message,
      };

    // GET USER POSTS
    case GET_USER_POSTS_REQUESTED:
      return {
        ...state,
        isGetUserPostsRequest: true,
        isGetUserPostsSuccess: false,
        isGetUserPostsFailure: false,
      };

    case GET_USER_POSTS_SUCCEEDED:
      const { userPosts } = action.payload;
      return {
        ...state,
        isGetUserPostsRequest: false,
        isGetUserPostsSuccess: true,
        userPosts: [...userPosts],
      };

    case GET_USER_POSTS_FAILED:
      return {
        ...state,
        isGetUserPostsRequest: false,
        isGetUserPostsFailure: true,
        error: action.payload.message,
      };

    // LIKE POST
    case LIKE_POST_REQUESTED:
      return {
        ...state,
        isLikePostRequest: true,
        isLikePostSuccess: false,
        isLikePostFailure: false,
      };
    case LIKE_POST_SUCCEEDED:
      const { postId, user } = action.payload;
      return {
        ...state,
        isLikePostRequest: false,
        isLikePostSuccess: true,
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            post.likedByUsers = [...post.likedByUsers, user];
          }
          return post;
        }),
      };
    case LIKE_POST_FAILED:
      return {
        ...state,
        isLikePostRequest: false,
        isLikePostFailure: true,
        error: action.payload.message,
      };

    // UNLIKE POST

    case UNLIKE_POST_REQUESTED:
      return {
        ...state,
        isUnlikePostRequest: true,
        isUnLikePostSuccess: false,
        isUnLikePostFailure: false,
      };
    case UNLIKE_POST_SUCCEEDED: {
      const { postId, userId } = action.payload;
      return {
        ...state,
        isUnLikePostRequest: false,
        isUnLikePostSuccess: true,
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            post.likedByUsers = post.likedByUsers.filter(
              (likedByUser) => likedByUser.id !== userId
            );
          }
          return post;
        }),
        likedPosts: state.likedPosts.filter((post) => post.id !== postId),
      };
    }
    case UNLIKE_POST_FAILED:
      return {
        ...state,
        isUnLikePostRequest: false,
        isUnLikePostFailure: true,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default postsReducer;
