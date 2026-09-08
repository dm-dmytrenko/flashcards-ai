import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("Authorize error: Missing credentials");
                    return null;
                }
                const user = await db.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user) {
                    console.log("Authorize error: User not found in database");
                    return null;
                }

                if (!user.password) {
                    console.log("Authorize error: User has no password set");
                    return null;
                }
                const isValid = await verifyPassword(
                    credentials.password as string, user.password
                );

                if (!isValid) {
                    console.log("Authorize error: Password does not match");
                    return null;
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
})