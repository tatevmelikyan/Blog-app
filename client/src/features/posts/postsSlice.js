export const actionTypes = {
  GET_ALL_POSTS_REQUESTED: "GET_ALL_POSTS_REQUESTED",
  GET_ALL_POSTS_SUCCEEDED: "GET_ALL_POSTS_SUCCEEDED",
  GET_ALL_POSTS_FAILED: "GET_ALL_POSTS_FAILED",
};

export const actions = {
    getAllPosts: () => ({ type: actionTypes.GET_ALL_POSTS_REQUESTED })
}


const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS_REQUESTED:
      return { ...state, loading: true };
    case actionTypes.GET_ALL_POSTS_SUCCEEDED:
      const { posts } = action.payload;
      return { ...state, posts, loading: false };
    case actionTypes.GET_ALL_POSTS_FAILED:
        console.log('failed');
      const { error } = action.payload;
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
