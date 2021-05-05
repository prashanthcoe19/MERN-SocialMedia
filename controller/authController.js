import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    if (!user.matchPassword(password)) {
      return res.status(400).json({ msg: "email and pwd doesn't match" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    res.cookie('t', token, {
      expire: new Date() + 9999,
    });
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getloggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.send('User not found');
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export default { getloggedInUser, login };
