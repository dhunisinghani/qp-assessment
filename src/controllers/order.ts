import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import db from '../database/db';

export const createOrder = async ( req: Request, resp: Response) => {
    try {
      const products = req.body.products;
      const user = req.body.user;
      console.log({products, user, body: req.body})
      const order = await db.order.create({
        data: {
            userId: user.userId,
            status: "PENDING",
            OrderItems: {
                createMany: {
                    data: [
                    ...products,
                ]
            }
            },
        },
       
      });
       
      resp.status(200).json({
        success: true,
        message: `Successfully Placed your order(${order.id}).`
      })

    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: `Unable to place order due to ${error.message}`
        })
    }
}