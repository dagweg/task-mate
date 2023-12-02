import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Url } from "next/dist/shared/lib/router/router";

  


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



