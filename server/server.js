const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to social media app' }));

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port ${PORT}`);
});
