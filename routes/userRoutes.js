import express from 'express';
const router = express.Router();
import validator from '../validator/validator.js';
import userController from '../controller/userController.js';
import auth from '../middleware/auth.js';

router
  .route('/')
  .post(validator.signup, userController.create)
  .get(userController.listUser);

router
  .route('/:userId')
  .put(auth, validator.signup, userController.updateUser)
  .delete(auth, userController.deleteUser);

export default router;
