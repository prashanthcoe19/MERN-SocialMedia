import {
  NEW_POST,
  DELETE_POST,
  LIKE,
  UNLIKE,
  COMMENT,
  UNCOMMENT,
  NEWS_FEED,
  GET_POST,
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
    case NEWS_FEED:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
