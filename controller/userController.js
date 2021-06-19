import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
const create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.error('User already exists');
      res.status(400).send('User already exists');
    }
    user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.json({
      user,
      token: generateToken(user._id),
    });
    // req.user = id;
    // next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const listUser = async (req, res) => {
  try {
    let users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateUser = async (req, res) => {
  const { name, bio } = req.body;
  const photo = req.file.filename;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.photo = photo || user.photo;
      user.updated = Date.now();
      const modified = await user.save();
      res.json(modified);
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).send('User not Found');
  }
};

// const bio = async (req, res) => {
//   try {
//     const { bio } = req.body;
//     console.log(bio);
//     let user = await User.findById(req.user.id);
//     if (user) {
//       user.bio = bio || user.bio;
//     }
//     user.updated = Date.now();
//     const modified = await user.save();
//     res.json(modified.user);
//   } catch (err) {
//     res.status(400).send('Server Error');
//   }
// };
const updatePicture = async (req, res) => {
  try {
    let picture = await User.findByIdAndUpdate(
      req.user._id,
      {
        $in: req.body.pic,
      },
      { new: true }
    );
    res.json(picture);
  } catch (err) {
    res.status(400).send('server error');
  }
};

const searchUser = async (req, res) => {
  try {
    let regex = new RegExp(req.params.name, 'i');
    let users = await User.find({ name: regex });
    if (!users) {
      return res.status('400').json({
        error: 'User not found',
      });
    }
    return res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      await user.remove();
      res.json({ message: 'user removed' });
    }
  } catch (err) {
    console.lerror(err.message);
    res.status(404).send('User not Found');
  }
};

const userByID = async (req, res) => {
  // console.log(req.params.userId);
  try {
    let user = await User.findById(req.params.userId)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .populate('post', 'postedBy text photo')
      .exec();
    if (!user)
      return res.status('400').json({
        error: 'User not found',
      });
    res.json(user);
    // console.log(user);
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user',
    });
  }
};

const follow = async (req, res) => {
  if (req.user._id === req.body.followId) {
    return res.status(400).json({ error: 'You cannot follow yourself' });
  }
  let result1;
  let result2;
  try {
    result1 = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    )
      .select('-password')
      .exec();
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
  try {
    result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    )
      .select('-password')
      .exec();
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
  res.json({ result1, result2 });
};

const unfollow = async (req, res) => {
  if (req.user._id === req.body.unfollowId) {
    return res.status(400).json({ error: 'You cannot follow yourself' });
  }
  let result1;
  let result2;
  console.log(req.body.unfollowId);
  try {
    result1 = await User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    )
      .select('-password')
      .exec();
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
  try {
    result2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.unfollowId },
      },
      { new: true }
    )
      .select('-password')
      .exec();
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
  res.json({ result1, result2 });
};

export default {
  create,
  listUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
  userByID,
  searchUser,
};
