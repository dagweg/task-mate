// import { authOptions } from "@/app/lib/auth";
// import { db } from "@/app/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import { Url } from "next/dist/shared/lib/router/router";





// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export const authOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })

    ]
}


export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
