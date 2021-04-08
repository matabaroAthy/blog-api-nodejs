/* eslint-disable linebreak-style */
import { Router } from 'express';
import checkUsername from '../../middleware/verifysignup';
import UserController from '../../modules/authController';

const authRoutes = Router();

authRoutes.post('/auth/signup', checkUsername, UserController.signup);

export default authRoutes;
