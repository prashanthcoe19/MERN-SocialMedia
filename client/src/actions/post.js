import axios from 'axios';
import {
  NEW_POST,
  DELETE_POST,
  UPDATE_LIKES,
  COMMENT,
  UNCOMMENT,
  NEWS_FEED,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  GET_USER_POSTS,
} from './types';
import { setAlert } from './alert';

//newsfeed

export const newsFeed = () => async (dispatch) => {
  try {
    let res = await axios.get('/api/post/newsfeed');
    console.log(res);
    dispatch({
      type: NEWS_FEED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const newPost = (newpost) => async (dispatch) => {
  try {
    console.log(newpost);
    let res = await axios.post('/api/post/new', newpost);
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
    // console.log(res);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostByUserId = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/post/postBy/${id}`);
    console.log(res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/post/${id}`);
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

export const comment = (text, postId) => async (dispatch) => {
  let body = JSON.stringify({ text, postId });
  console.log(text, postId);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    let res = await axios.put(`/api/post/comment`, body, config);
    console.log(res.data);
    dispatch({
      type: COMMENT,
      payload: res.data,
    });
    dispatch(newsFeed());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const uncomment = (postId, commentId) => async (dispatch) => {
  try {
    let res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: UNCOMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Removed', 'success'));
    dispatch(newsFeed());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/post/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(newsFeed());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/post/unlike/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(newsFeed());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
