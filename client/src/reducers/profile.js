import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  FOLLOW,
  FOLLOW_ERROR,
  UNFOLLOW,
  SEARCH_ERROR,
  SEARCH_RESULTS,
} from '../actions/types';
const initialState = {
  profil: {},
  profiles: [],
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
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        profil: payload.result1,
        loading: false,
      };
    case SEARCH_RESULTS:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profiles: [],
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
