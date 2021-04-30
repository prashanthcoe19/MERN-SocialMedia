import express from 'express';
const router = express.Router();
import validateUser from '../validator/validator.js';
import create from '../controller/userController.js';

router.route('/').post(validateUser, create);

export default router;
