import express from 'express';
const router = express.Router();
import validator from '../validator/validator.js';
import userController from '../controller/userController.js';
import authController from '../controller/authController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

router
  .route('/')
  .post(validator.signup, userController.create)
  .get(userController.listUser)
  .put(auth, upload, userController.updateUser);

// router.route('/bio').post(auth, userController.bio);

router.route('/follow').put(auth, userController.follow);

router.route('/unfollow').put(auth, userController.unfollow);

router.route('/search/:name').get(auth, userController.searchUser);

router
  .route('/:userId')
  .get(userController.userByID)
  .delete(auth, userController.deleteUser);

// router.route('/post/postId').get(postController.postByID);

// router.param('userId', userController.userByID);

export default router;
