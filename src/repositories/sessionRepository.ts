import { Sessions } from "@prisma/client";
import { prisma } from "../configs/database.js";

export type dataSession = Omit<Sessions, 'id' | 'createdAt'>;

export const createSession = async (data: dataSession) => {
    const session = await prisma.sessions.create({
        data: {
            ...data,
        },
    });

    return session;
}