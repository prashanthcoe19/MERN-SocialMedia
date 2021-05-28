import axios from axios;
import {NEW_POST, DELETE_POST, LIKE, UNLIKE,COMMENT,UNCOMMENT, NEWS_FEED, GET_POST} from './types';
import { setAlert } from './alert';

//newsfeed

export const newsFeed = ()=>async (dispatch)=>{
    try{
        let res = axios.get('/api/post/newsfeed');
        dispatch({
            type: NEWS_FEED,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const newPost = (formData) =>async(dispatch)=>{
    try{
        let res = axios.post('/api/post/new');
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        });
    }
}
