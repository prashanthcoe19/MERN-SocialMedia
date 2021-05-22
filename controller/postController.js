import Post from '../models/Post.js';
import fs from 'fs';
import formidable from 'formidable';
import User from '../models/User.js';

//@desc: create a new post
//@access:  private
//@route: api/post/new
const create = async (req, res) => {
  const { text } = req.body;
  try {
    let post = new Post({
      text,
      postedBy: req.user.id,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc: post list of certain user
// @access:  private
// @route: api/post/by/userId
const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.params.userId })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// @desc get posts from followed users
// @access private
// @route api/post/newsfeed
const newsFeed = async (req, res) => {
  try {
    let posts = await User.findOne({
      postedBy: {
        $in: req.user.following,
      },
    })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .sort('-created')
      .exec();
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc like a post
// @access private
// @route api/post/like
const like = async (req, res) => {
  try {
    let likes = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    );
    res.json(likes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc unlike a post
// @access private
// @route api/post/unlike
const unlike = async (req, res) => {
  try {
    let unlikes = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    );
    res.json(unlikes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @desc comment on a post
// @access private
// @route api/post/comment
const addComment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err });
  }
};

// @desc like a post
// @access private
// @route api/post/uncomment
const deleteComment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err });
  }
};

// @desc delete a post
// @access private
// @route api/post/:postId
const deletePost = async (req, res) => {
  try {
    let post = Post.findOne({ _id: req.params.postId }).populate(
      'postedBy',
      '_id'
    );
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      let deletePost = post.remove(user);
      res.json(deletePost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

// @desc get a particular post by post ID
// @access private
// @route api/post/:postId
const getPostById = async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.postId }).populate(
      'postedBy',
      '_id name'
    );
    res.json(post);
  } catch (err) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const photo = (req, res, next) => {
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

export default {
  create,
  photo,
  listByUser,
  getPostById,
  newsFeed,
  deletePost,
  like,
  unlike,
  deleteComment,
  addComment,
};
