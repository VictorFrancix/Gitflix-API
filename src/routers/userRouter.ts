import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import * as userController from "../controllers/userController.js";
import * as userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchema.signUpSchema), userController.signUp);
userRouter.post("/sign-in", validateSchema(userSchema.signInSchema), userController.signIn);

export default userRouter;