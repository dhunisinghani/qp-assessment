import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import db from '../database/db';


export const getProducts = (req: Request, resp: Response) => { 
    try {
        
    } catch (error: any) {
        
    }
};
export const getProductById = (req: Request, resp: Response) => { };
export const addProduct = (req: Request, resp: Response) => { 
    try {
        console.log(`Add product`, req.body)

        resp.status(200).json({
            success: true,
            ...req.body
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