import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../database/db';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const register = async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return resp.status(400).json({ success: false, errors: errors.array() });
        }

        const { firstName, lastName, email, password, phone, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 5);

        let user = await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                role
            }
        });

        resp.status(200).json({
            success: true,
            message: `Welcome ${user.firstName} ${user.lastName}`
        });
    } catch (error: any) {
        if (error.code = "P2002") {
            return resp.status(500).json({
                success: false,
                error: `${error.meta.target} already exists`
            });
        }
        resp.status(500).json({
            success: false,
            error: `Unable to register user due to ${error.message}`
        });
    }
};

export const login = async (req: Request, resp: Response) => {
    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await db.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            return resp.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        // Check password
        if (!await bcrypt.compare(password, user.password)) {
            return resp.status(401).json({ message: 'Incorrect password' });
        }

        // User authenticated, generate JWT access token
        const accessToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET_KEY, { expiresIn: "1hr" });

        return resp.status(200).json({
            success: true,
            accessToken,
            message: `Welcome ${user.firstName} ${user.lastName}`
        })
    } catch (error: any) {
        resp.status(500).json({
            success: false,
            error: `Unable to login due ${error.message}`
        })
    }
};
