import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';

import {getProducts, getProductById, addProduct, updateProduct, removeProduct} from "../controllers/product";
const productRouter = Router();

productRouter.get('/', auth, getProducts);

productRouter.get('/:id', auth, getProductById);

productRouter.post('/add', auth, isAdmin, addProduct);

productRouter.put('/update', auth , isAdmin, updateProduct);

productRouter.delete('/remove', auth, isAdmin, removeProduct);

export default productRouter;