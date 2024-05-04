import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import db from '../database/db';


export const getProducts = async (req: Request, resp: Response) => {
    try {
        const products = await db.product.findMany();

        resp.status(200).json({
            success: true,
            products,
        })

    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: error.message
        })
    }
};

export const getProductById = async (req: Request, resp: Response) => {
    try {

        const errors = validationResult(req);

        const { id } = req.params;

        if (!errors.isEmpty()) {
            return resp.status(400).json({ success: false, errors: errors.array() });
        }

        const product = await db.product.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!product) {
            return resp.status(400).json({
                success: false,
                error: `No product found with ${id}`
            })
        }

        resp.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        resp.status(400)
    }
};

export const addProduct = async (req: Request, resp: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return resp.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, price, category, weight, measurement, stock } = req.body;

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

export const removeProduct = async (req: Request, resp: Response) => {
    try {

        const errors = validationResult(req);

        const { id } = req.params;

        if (!errors.isEmpty()) {
            return resp.status(400).json({ success: false, errors: errors.array() });
        }

        const product = await db.product.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!product) {
            return resp.status(400).json({
                success: false,
                error: `Unable to delete due to no product found with ${id}`
            })
        }

        db.product.delete({
            where: {
                id: parseInt(id)
            }
        })

        resp.status(200).json({
            success: true,
            messsage: `Successfully deleted product with id ${id}`
        })

    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: `Unable to delete product due to ${error.message}`
        })
    }
};

