import jwt from 'jsonwebtoken';
import config from 'config';

const auth = (req, res, next) => {
  //get token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //check if not token

  if (!token) {
    return res.status(401).json({ msg: 'no token auth denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};

export default auth;
