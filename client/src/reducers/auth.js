import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  BIO_UPDATED,
  BIO_UPDATED_FAIL,
  GET_PROFILE,
  PROFILE_ERROR,
  FOLLOW,
  UNFOLLOW,
  FOLLOW_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: {},
  errors: {},
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case BIO_UPDATED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        // user: payload,
      };
    case BIO_UPDATED_FAIL:
      return {
        ...state,
        error: { payload },
        isAuthenticated: true,
        loading: false,
      };
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        user: payload.result2,
        isAuthenticated: true,
        loading: false,
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: action.payload,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
