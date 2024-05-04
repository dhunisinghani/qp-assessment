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
            error: `Unable to get products due to ${error.message}`
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
    } catch (error: any) {
        resp.status(400).json({
            success: false,
            error: `Unable to get product due to ${error.message}`
        })
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
            error: `Unable to add product due to${error.message}`
        })
    }
};

export const updateProduct = async (req: Request, resp: Response) => { 
    try {
        const productPayload  = req.body.product;

        const product = await db.product.findUnique({
            where: {
                id: parseInt(productPayload.id),
            }
        })

        if (!product) {
            return resp.status(400).json({
                success: false,
                error: `No product found with id ${productPayload.id}`
            })
        }

        const updatedProduct = await db.product.update({
            where:{
                id: productPayload.id,
            },
            data:{
                ...productPayload,
            }
        });

        resp.status(200).json({
            success: false,
            updatedProduct,
            message:`Successfully updated product.`
        });


    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: `Unable to update product due ${error.message}`
        })
    }
};

export const updateQuantity = async (req: Request, resp: Response) => { 
    try {
        const {id, stock}: {id: number, stock: number}  = req.body;
        console.log({id, stock})
        const product = await db.product.findUnique({
            where: {
                id,
            }
        })

        if (!product) {
            return resp.status(400).json({
                success: false,
                error: `No product found with id ${id}`
            })
        }

        const updatedProduct = await db.product.update({
            where:{
                id,
            },
            data:{
                stock,
            }
        });

        resp.status(200).json({
            success: false,
            updatedProduct,
            message:`Successfully updated product quantity.`
        });


    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: `Unable to update product quantity due ${error.message}`
        })
    }
};

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

       await db.product.delete({
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

