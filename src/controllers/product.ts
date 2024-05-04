import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import db from '../database/db';


export const getProducts = (req: Request, resp: Response) => { 
    try {
        
    } catch (error: any) {
        
    }
};
export const getProductById = (req: Request, resp: Response) => { };
export const addProduct = async (req: Request, resp: Response) => { 

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return resp.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, price, category, weight, measurement, stock} = req.body;

        const product = await db.product.create({
            data: {
                name,
                price,
                category,
                weight,
                measurement,
                stock,
            }
        })
        resp.status(200).json({
            success: true,
            product,
            message: `Successfully added product ${product.name}`
        })
    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: error.message
        })
    }
};
export const updateProduct = (req: Request, resp: Response) => { };
export const removeProduct = (req: Request, resp: Response) => { };