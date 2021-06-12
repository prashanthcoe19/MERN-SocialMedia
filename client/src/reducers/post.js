import {
  NEW_POST,
  DELETE_POST,
  COMMENT,
  UNCOMMENT,
  NEWS_FEED,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  GET_USER_POSTS,
  UPDATE_LIKES,
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
        ...state.posts,
        post: payload,
        loading: false,
      };
    case COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload.comments },
        loading: false,
      };
    case UNCOMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          post: { ...state.post, comments: payload.comments },
          // comments: state.post.comments.filter(
          //   (comment) => comment._id !== payload
          // ),
        },
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
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
