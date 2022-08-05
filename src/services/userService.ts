import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

import * as sessionRepository from '../repositories/sessionRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import * as dataUtils from '../utils/dataUtils.js';
import { unauthorizedError, conflictError } from '../utils/errorUtils.js';


export const signUp = async (data: userRepository.createUserData ) => {
    const { name, email, password } = data;

    await checkUserExists(email);

    const encryptPassword = dataUtils.encryptPassword(password);

    const user = await userRepository.createUser({ name, email, password: encryptPassword});

    delete user.password;
    delete user.createdAt;

    return user;
}

const checkUserExists = async (email: string) => {
    const user = await userRepository.getUSerbByEmail(email);

    if (user) throw conflictError("Email already registered");
}

export const signIn = async (data: userRepository.userData) => {
    const { email, password } = data;

    const user = await userRepository.getUSerbByEmail(email);

    if (!user) throw unauthorizedError("Invalid credentials");
    
    const isValid = dataUtils.comparePassword(password, user.password);

    if (!isValid) throw unauthorizedError("Invalid credentials");
    
    const token = generateToken(user.id);

    await sessionRepository.createSession({ userId: user.id, token });

    delete user.password;
    delete user.createdAt;

    return { user, token };
}

const generateToken = (id : Number) => {
    const config = { expiresIn: '6h' };
    const token = Jwt.sign({ id }, process.env.JWT_SECRET, config);
    return token;
}





