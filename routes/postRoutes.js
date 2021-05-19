import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import postController from '../controller/postController.js';
import userController from '../controller/userController.js';

router.route('/new/:userId').post(auth, postController.create);
// router.route('/photo/:postId').get(postController.photo);

router.route('/by/:userId').get(auth, postController.listByUser);

// router.param('userId', userController.userByID);
// router.param('postId', postController.postByID);

export default router;
