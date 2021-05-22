import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
const create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
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
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password;
      }
      user.updated = Date.now();
      const modified = await user.save();
      res.json(modified.user);
    }
  } catch (err) {
    console.lerror(err.message);
    res.status(404).send('User not Found');
  }
};

const updatePicture = (req, res) => {
  try {
    let picture = User.findByIdAndUpdate(
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
  try {
    let user = await User.findById(req.params.userId)
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .populate('post', 'postedBy ')
      .exec();
    if (!user)
      return res.status('400').json({
        error: 'User not found',
      });
    res.json(user);
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve user',
    });
  }
};

const follow = async (req, res) => {
  try {
    if (req.body.userId === req.body.followId) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
};

const unfollow = async (req, res) => {
  try {
    if (req.body.userId === req.body.followId) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      {
        $pull: { followers: req.body.userId },
      },
      {
        new: true,
      }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { following: req.body.unfollowId },
      },
      {
        new: true,
      }
    )
      .select('-password')
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).send('Error');
  }
};

export default {
  create,
  listUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
  userByID,
};
