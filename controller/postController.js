import Post from '../models/Post.js';
import fs from 'fs';
import formidable from 'formidable';
import User from '../models/User.js';
// import userController from './userController.js';

const create = async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.params.userId).select('-password');
  try {
    let post = new Post({
      text,
      postedBy: user.id,
    });
    // post.postedBy = req.body;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const postById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate('postedBy', '_id name').exec();
    if (!post) {
      return res.status(400).send('Post not found');
    }
    post = req.post;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user post',
    });
  }
  {
  }
};

const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.params.userId })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec();
    // req.profile = posts;
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

const photo = (req, res, next) => {
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

export default { create, photo, listByUser, postById };
