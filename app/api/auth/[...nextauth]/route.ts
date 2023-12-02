import { db } from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { Url } from "next/dist/shared/lib/router/router";

const authOptions: NextAuthOptions = {
    callbacks: {
      
      session: ({ session, user }) => {
        console.log("😎😎😎😎😎 session",session)
        return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
  
        
      }},
    
  },
    adapter: PrismaAdapter(db),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID !,
        clientSecret: process.env.GITHUB_CLIENT_SECRET! ,
      })
      /**
       * ...add more providers here.
       *
       * Most other providers require a bit more work than the GITHUB provider. For example, the
       * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
       * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
       *
       * @see https://next-auth.js.org/providers/github
       */
    ],
  
   
  };
  

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
