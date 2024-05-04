import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { login, register } from '../controllers/user';

const userRouter = Router();

// Validation middleware
const validateRegisterInput = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('role').isIn(['ADMIN', 'USER']).withMessage('Role must be either ADMIN or USER')
];

userRouter.post('/register', validateRegisterInput, register);

userRouter.post('/login', login);

export default userRouter;