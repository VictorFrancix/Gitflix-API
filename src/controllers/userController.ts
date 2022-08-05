import { Request, Response } from "express";

import * as userService from "../services/userService.js";

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    
    const user = await userService.signUp({ name, email, password });

    res.status(201).send(user);
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.signIn({ email, password });

    res.status(200).send(user);
}