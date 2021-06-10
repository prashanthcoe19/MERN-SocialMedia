import {
  NEW_POST,
  DELETE_POST,
  LIKE,
  UNLIKE,
  COMMENT,
  UNCOMMENT,
  NEWS_FEED,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  GET_USER_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case NEWS_FEED:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    // case GET_USER_POSTS:
    //   return {
    //     ...state,
    //     userposts: payload,
    //     loading: false,
    //   };
    case POST_ERROR:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
