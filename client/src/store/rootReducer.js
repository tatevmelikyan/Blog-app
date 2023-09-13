import { combineReducers } from "redux";
import postsReducer from "../features/posts/slice";
import userReducer from "../features/user/slice";
import authReducer from "../features/auth/slice";

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
