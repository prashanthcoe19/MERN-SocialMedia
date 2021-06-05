import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import postController from '../controller/postController.js';
import upload from '../middleware/upload.js';
import validator from '../validator/validator.js';

router.route('/new').post(auth, upload, postController.create);

router.route('/newsfeed').get(auth, postController.newsFeed);

router.route('/deletePost').delete(auth, postController.deletePost);

router.route('/like').put(auth, postController.like);

router.route('/unlike').put(auth, postController.unlike);

router.route('/comment').put(auth, postController.addComment);

router.route('/uncomment').put(auth, postController.deleteComment);

router.route('/by').get(auth, postController.listByUser);

router
  .route('/:postId')
  .get(auth, postController.getPostById)
  .delete(auth, postController.deletePost);

export default router;
