const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to social media app' }));

app.use(express.json({ extended: false }));

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port ${PORT}`);
});
