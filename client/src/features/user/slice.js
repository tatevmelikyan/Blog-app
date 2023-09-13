import { GET_USER_FAILED, GET_USER_REQUESTED, GET_USER_SUCCEEDED } from "./constants";

const initialState = {
  user: null,
  isGetUserRequest: false,
  isGetUserSuccess: false,
  isGetUserFailure: false,
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // GET USER
    case GET_USER_REQUESTED:
      return {
        ...state,
        isGetUserRequest: true,
        isGetUserSuccess: false,
        isGetUserFailure: false,
        error: null,
      };
    case GET_USER_SUCCEEDED:
      const { user } = action.payload;
      return {
        ...state,
        user,
        isGetUserRequest: false,
        isGetUserSuccess: true,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserFailure: true,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export default userReducer;
