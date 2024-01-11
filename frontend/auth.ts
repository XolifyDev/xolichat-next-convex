import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import NextAuth from "next-auth";
import { db } from "./lib/db";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session ({ session, token }) {
            if(token.sub && session.user) {
                session.user.id = token.sub; 
            }
            return session;
        },
        async jwt ({ token, user }) {

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    ...authConfig
});
