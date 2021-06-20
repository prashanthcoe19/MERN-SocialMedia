import axios from 'axios';
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
  GET_PROFILES,
  PROFILE_ERROR,
  FOLLOW,
  UNFOLLOW,
  FOLLOW_ERROR,
  SEARCH_ERROR,
  SEARCH_RESULTS,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utilities/setAuthToken';

//LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//REGISTER USER
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg, 'danger'));
      }
      // console.log(error.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: errors,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      // console.log(email);
      const res = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data;
      console.log(errors);

      if (errors) {
        alert(errors, 'danger');
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const update = (data) => async (dispatch) => {
  try {
    let res = await axios.put('/api/users', data);
    console.log(res.data);
    dispatch({
      type: BIO_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert('Profile Updated', 'success'));
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: BIO_UPDATED_FAIL,
    });
  }
};

export const getProfileById = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/users/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const follow = (followId) => async (dispatch) => {
  console.log(followId);
  let body = JSON.stringify({ followId });
  console.log(body);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let res = await axios.put(`/api/users/follow`, body, config);
    console.log(res.data);
    dispatch({
      type: FOLLOW,
      payload: res.data,
    });
    // dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: FOLLOW_ERROR,
    });
  }
};

export const unfollow = (unfollowId) => async (dispatch) => {
  console.log(unfollowId);
  let body = JSON.stringify({ unfollowId });
  console.log(body);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let res = await axios.put('/api/users/unfollow', body, config);
    console.log(res.data);
    dispatch({
      type: UNFOLLOW,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: FOLLOW_ERROR,
    });
  }
};
export const listUsers = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/users`);
    console.log(res);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
export const searchUsers = (name) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/users/search/${name}`);
    console.log(res.data);
    dispatch({
      type: SEARCH_RESULTS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'danger'));
    }
    dispatch({
      type: SEARCH_ERROR,
    });
  }
};
export const logout = () => ({ type: LOG_OUT });
