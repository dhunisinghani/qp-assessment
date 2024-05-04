import { Request, Response, NextFunction } from 'express';
import db from '../database/db';

const isAdmin = async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const {id, email} = req.body.user;

        const user = await db.user.findUnique({
            where: {
                email,
            }
        })

        if (!user)
            return resp.status(404).json({message: `User ${email} was not found`});

        if (user.role !== "ADMIN")
            return resp.status(401).json({message: "Unauthorized user"});

        next();
    } catch (error: any) {
        return resp.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export default isAdmin;