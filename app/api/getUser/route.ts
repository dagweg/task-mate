import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { db } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));

    let users = null as any;
    const uid = (body?.uid as string | undefined) ?? undefined;

    if (uid && typeof uid === "string") {
      users = await db.user.findFirst({
        where: { id: uid },
      });
    } else {
      // Fallback to NextAuth session if no uid was provided and a session cookie exists
      const hasSessionCookie =
        req.cookies.get("next-auth.session-token") ||
        req.cookies.get("__Secure-next-auth.session-token") ||
        req.cookies.get("next-auth.session-token.0");
      if (hasSessionCookie) {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email ?? undefined;
        if (email) {
          users = await db.user.findUnique({ where: { email } });
        }
      }
    }

    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        name: users?.firstName,
        email: users?.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("error", { status: 500 });
  }
}
