import express from 'express';
const app = express();
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to social media app' }));

app.use(express.json({ extended: false }));

app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port ${PORT}`);
});
