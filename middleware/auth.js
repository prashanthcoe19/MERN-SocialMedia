import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from 'config';

const auth = async (req, res, next) => {
  //get token from header

  const token = req.header('x-auth-token');
  //check if not token

  if (!token) {
    return res.status(401).json({ msg: 'no token auth denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = await User.findById(decoded.id).select('-password');
    // req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};

export default auth;
