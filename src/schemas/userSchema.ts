import Joi from "joi";


export const signUpSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password")
});

export const signInSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});