import express from 'express';
const router = express.Router();
import validator from '../validator/validator.js';
import authController from '../controller/authController.js';
import auth from '../middleware/auth.js';

router
  .route('/')
  .post(validator.signin, authController.login)
  .get(auth, authController.getloggedInUser);

export default router;
