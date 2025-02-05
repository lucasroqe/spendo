import { betterAuth, getSignedCookie } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", 
    }),
    emailAndPassword: {  
        minPasswordLength: 3,
        enabled: true,
        autoSignIn: true
    }
});
