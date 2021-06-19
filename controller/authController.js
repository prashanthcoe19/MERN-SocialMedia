import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('email not found');
    }
    if (!(await user.matchPassword(password))) {
      res.status(400).send('pwd wrong');
    }
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

const getloggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.send('User not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

export default { getloggedInUser, login };
