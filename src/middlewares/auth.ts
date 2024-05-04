import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "my_little_secret";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            return res.status(401).json({message: "No authorization token was provided"});

        const decodedData:any = jwt.verify(auth, JWT_SECRET_KEY);
        req.body.user = decodedData;
        next();
    } catch (error: any) {
        res.status(401).json({
            message: error.message
        })
    }
}

export default auth;