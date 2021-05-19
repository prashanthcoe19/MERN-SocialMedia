import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(password);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'email not found' });
    }
    if (!(await user.matchPassword(password))) {
      return res.status(400).json({ msg: 'pwd wrong' });
    }
    res.json({
      user,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error(err.message);
    console.log(user.matchPassword(password));
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
