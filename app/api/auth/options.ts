import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.toString() || "";
          const password = credentials?.password?.toString() || "";
          if (!email || !password) return null;
          const user = await db.user.findUnique({ where: { email } });
          if (!user?.password) return null;
          const ok = await bcrypt.compare(password, user.password);
          if (!ok) return null;
          return {
            id: user.id,
            email: user.email || undefined,
            name:
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              undefined,
            image: user.image || undefined,
          } as any;
        } catch {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).id) {
        token.uid = (user as any).id;
      }
      if (!token.uid && token.email) {
        try {
          const u = await db.user.findUnique({ where: { email: token.email } });
          if (u) token.uid = u.id;
        } catch {}
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.uid) {
        (session.user as any).id = token.uid as string;
      }
      return session;
    },
    async signIn({ user }) {
      try {
        const email = user?.email ?? null;
        if (!email) return true;
        const existing = await db.user.findUnique({ where: { email } });
        if (!existing) {
          const fullName = user?.name || "";
          const [firstName, ...rest] = fullName.split(" ");
          await db.user.create({
            data: {
              email,
              firstName: firstName || undefined,
              lastName: rest.length ? rest.join(" ") : undefined,
              image: user?.image || undefined,
            },
          });
        }
        return true;
      } catch (e) {
        console.error("NextAuth signIn callback error:", e);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
