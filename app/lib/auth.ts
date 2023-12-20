import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./prisma";
import GitHubProvider from "next-auth/providers/github";


export 
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
    pages:{
        signIn:"/login",
        error:'/login'
    }
  
   
  };


export const getServerAuthSession = () => getServerSession(authOptions);
