export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { SignJWT } from "jose";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? undefined;
    const uid = (session?.user as any)?.id as string | undefined;
    if (!email || !uid)
      return NextResponse.json("Not authenticated", { status: 401 });

    const secret = new TextEncoder().encode(
      process.env.APP_JWT_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret"
    );
    const token = await new SignJWT({ sub: uid, email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);
    return NextResponse.json({ token }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json("Failed to issue token", { status: 500 });
  }
}
