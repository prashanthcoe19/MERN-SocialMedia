import express from 'express';
const router = express.Router();
import validator from '../validator/validator.js';
import userController from '../controller/userController.js';
import postController from '../controller/postController.js';
import auth from '../middleware/auth.js';

router
  .route('/')
  .post(validator.signup, userController.create)
  .get(userController.listUser);

router
  .route('/follow')
  .put(auth, userController.addFollower, userController.addFollower);

router
  .route('/:userId')
  .put(auth, validator.signup, userController.updateUser)
  // .get(userController.userByID)
  .delete(auth, userController.deleteUser);

// router.route('/post/postId').get(postController.postByID);

// router.param('userId', userController.userByID);

export default router;
