import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import postController from '../controller/postController.js';
import userController from '../controller/userController.js';
import validator from '../validator/validator.js';

router.route('/new').post(auth, validator.post, postController.create);

router.route('/newsfeed').get(auth, postController.newsFeed);

router.route('/deletePost').delete(auth, postController.deletePost);

router.route('/like').put(auth, postController.like);

router.route('/unlike').put(auth, postController.unlike);

router.route('/comment').put(auth, postController.addComment);

router.route('/uncomment').put(auth, postController.deleteComment);

router
  .route('/:postId')
  .get(auth, postController.getPostById)
  .delete(auth, postController.deletePost);

router.route('/by/:userId').get(auth, postController.listByUser);

export default router;
