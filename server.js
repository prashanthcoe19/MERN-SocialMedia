import express from 'express';
const app = express();
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to social media app' }));

app.use(express.json({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port ${PORT}`);
});
