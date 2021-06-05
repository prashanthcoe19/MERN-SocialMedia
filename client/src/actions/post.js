import axios from 'axios';
import {
  NEW_POST,
  DELETE_POST,
  LIKE,
  UNLIKE,
  COMMENT,
  UNCOMMENT,
  NEWS_FEED,
  GET_POST,
  POST_ERROR,
} from './types';
import { setAlert } from './alert';

//newsfeed

export const newsFeed = () => async (dispatch) => {
  try {
    let res = axios.get('/api/post/newsfeed');
    dispatch({
      type: NEWS_FEED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const newPost = (newpost) => async (dispatch) => {
  try {
    console.log(newpost);
    let res = axios.post('/api/post/new', newpost);
    dispatch({
      type: NEW_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostByUser = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/post/by`);
    console.log(res);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
