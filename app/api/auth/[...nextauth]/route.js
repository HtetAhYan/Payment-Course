// app/api/auth/[...nextauth].js

import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();
export const authOptions = ({
    session: {
        strategy:"jwt"
    },
  providers: [
      CredentialsProvider({
          name: "Credentials",
        
      async authorize(credentials) {
        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
       
        });
        if (!user) {
          throw new Error("No user found");
        }

        if (credentials.password != user.password) {
          throw new Error("Incorrect password");
        }

   return user
      },
    }),  
  ], 
  adapter: PrismaAdapter(prisma),
  secret: "testSecret",

});
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}