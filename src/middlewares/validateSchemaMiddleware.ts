import { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: any) => {
    
    return function(req: Request, res: Response , next: NextFunction){
            
        const { error } = schema.validate(req.body, { abortEarly: false });
            
        if (error) return res.status(422).send(error.details.map(({message}) => message));
        
        next();
    }
}