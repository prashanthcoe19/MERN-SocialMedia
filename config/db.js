const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/socialMedia', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
