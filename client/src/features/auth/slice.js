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

const initialState = {
  isAuthenticated: false,

  isLoginRequest: false,
  isLoginSuccess: false,
  isLoginFailure: false,

  isLogoutRequest: false,
  isLogoutSuccess: false,
  isLogoutFailure: false,

  isRegisterRequest: false,
  isRegisterSuccess: false,
  isRegisterFailure: false,

  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    // LOGIN
    case LOGIN_USER_REQUESTED:
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
        isLoginFailure: false,
        error: null,
      };

    case LOGIN_USER_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: true,
        isLoginRequest: false,
        isLoginSuccess: true,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        isLoginRequest: false,
        isLoginFailure: true,
        error: action.payload.message,
      };

    // LOGOUT
    case LOGOUT_USER_REQUESTED:
      return {
        ...state,
        isLogoutRequest: true,
      };

    case LOGOUT_USER_SUCCEEDED: {
      return {
        ...state,
        isAuthenticated: false,
        isLogoutRequest: false,
        isLogoutSuccess: true,
      };
    }
    case LOGOUT_USER_FAILED:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutFailure: true,
        error: action.payload.message,
      };

    // REGISTER
    case REGISTER_USER_REQUESTED:
      return {
        ...state,
        isRegisterRequest: true,
        isRegisterSuccess: false,
        isRegisterFailure: false,
        error: null,
      };
    case REGISTER_USER_SUCCEEDED: {
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterSuccess: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterFailure: true,
        error: action.payload.message,
      };
    }

    default:
      return state;
  }
}

export default authReducer;
