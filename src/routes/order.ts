import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middlewares/auth';
import { createOrder } from '../controllers/order';

const orderRouter = Router();

orderRouter.post('/', auth, createOrder);

export default orderRouter;