import bcrypt from 'bcryptjs';
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
    res.status(200).json({
      message: 'Successfully signed up!',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export default create;
