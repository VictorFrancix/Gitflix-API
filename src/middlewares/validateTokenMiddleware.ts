import {Request, Response, NextFunction} from "express";
import Jwt from 'jsonwebtoken';
import { unauthorizedError } from "../utils/errorUtils.js";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) throw unauthorizedError("no token provide")

    token = token.replace("Bearer ", "");
    
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) unauthorizedError("invalid token")
    
    res.locals.user = decoded;
    
    next();
}

