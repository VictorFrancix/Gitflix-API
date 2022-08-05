import { Request, Response, NextFunction } from "express";

import { errorTypeToStatusCode } from "../utils/errorUtils.js";

export const handleError = (error, req: Request, res: Response, next: NextFunction) =>{
    if(error.type){
        const statusCode = errorTypeToStatusCode(error.type);

        res.status(statusCode).send(error.message);
    } else {
        res.status(500).send(error.message);
    }
}