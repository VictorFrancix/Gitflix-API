import { Users } from '@prisma/client';
import { prisma } from "../configs/database.js";

export type createUserData  = Omit<Users, 'id' | 'createdAt'>;
export type userData = Omit<Users, 'id' | 'createdAt' | 'name'>;

export const createUser = async (data: createUserData) => {
    const user = await prisma.users.create({
        data: {
            ...data,
        },
    });

    return user;
}

export const getUSerbByEmail = async (email: string) => {
    const user = await prisma.users.findFirst({
        where: {
            email,
        },
    });

    return user;
}
