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
  PROFILE_ERROR,
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
  } catch (err) {
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
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        alert('Error uploading picture');
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
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
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
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
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
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
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const logout = () => ({ type: LOG_OUT });
