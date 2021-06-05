import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trime: true,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email already exists'],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Enter valid email address',
    ],
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  photo: {
    data: Buffer,
    type: String,
    trim: true,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // console.log(enteredPassword);
  const match = await bcrypt.compare(enteredPassword, this.password);
  // console.log(match);
  return match;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);
