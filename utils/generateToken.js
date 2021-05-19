import jwt from 'jsonwebtoken';
import config from 'config';
const generateToken = (id) => {
  return jwt.sign({ id }, config.get('jwtSecret'), {
    expiresIn: '30d',
  });
};

export default generateToken;
