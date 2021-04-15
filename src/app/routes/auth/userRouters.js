/* eslint-disable linebreak-style */
import { Router } from 'express';
import validator from '../../middleware/validator';
import UserController from '../../modules/authController';
import asyncHandler from '../../middleware/asyncHandler';

const authRoutes = Router();

authRoutes.post('/auth/signup', validator.signup, UserController.signup);
authRoutes.post('/auth/signin', validator.signin, UserController.signin);

export default authRoutes;
