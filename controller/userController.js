import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';

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
    res.json(user);
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // jwt.sign(payload, config.get('jwtSecret'), (err, roken) => {
    //   if (err) throw err;
    //   res.json({ token });
    // });
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
      const updated = await user.save();
      res.json(updated.user);
    }
  } catch (err) {
    console.lerror(err.message);
    res.status(404).send('User not Found');
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

export default { create, listUser, updateUser, deleteUser };