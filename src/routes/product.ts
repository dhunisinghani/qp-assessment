import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import { getProducts, getProductById, addProduct, updateProduct, removeProduct } from "../controllers/product";

const productRouter = Router();

// Validation Product Input middleware
const validateproductInput = [
    // Name validation
    body('name').notEmpty().withMessage('Name is required'),

    // Price validation
    body('price').notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),

    // Stock validation
    body('stock').notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

    // Category validation
    body('category').notEmpty().withMessage('Category is required'),

    // Weight validation
    body('weight').notEmpty().withMessage('Weight is required')
        .isNumeric().withMessage('Weight must be a number'),

    // Measurement validation
    body('measurement').notEmpty().withMessage('Measurement is required')

];

productRouter.get('/', auth, getProducts);

productRouter.get('/:id', auth, getProductById);

productRouter.post('/add', auth, isAdmin, validateproductInput, addProduct);

productRouter.put('/update', auth, isAdmin, updateProduct);

productRouter.delete('/remove', auth, isAdmin, removeProduct);

export default productRouter;