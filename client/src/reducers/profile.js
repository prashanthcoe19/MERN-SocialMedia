import {
  GET_PROFILE,
  PROFILE_ERROR,
  FOLLOW,
  FOLLOW_ERROR,
  UNFOLLOW,
} from '../actions/types';
const initialState = {
  profil: {},
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profil: payload,
        loading: false,
      };
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        profil: payload.result1,
        loading: false,
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profil: {},
      };
    default:
      return state;
  }
}
export default profileReducer;
