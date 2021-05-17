import Post from '../models/Post.js';
import fs from 'fs';
import formidable from 'formidable';
// import userController from './userController.js';

const create = async (req, res) => {
  const { text } = req.body;
  try {
    let post = new Post({
      text,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(req.post.id)
      .populate('postedBy', '_id name')
      .exec();
    if (!post) {
      return res.status(400).send('Post not found');
    }
    post = req.post;
    res.send('This is the post by id of' + req.params.id);
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user post',
    });
  }
};

const listByUser = async (req, res, id) => {
  try {
    let posts = await Post.find({ postedBy: req.params.id })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).send('Server Error');
  }
};

const photo = (req, res, next) => {
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

export default { create, photo, postById, listByUser };
