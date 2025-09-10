import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { db } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? undefined;
    const uid = (session?.user as any)?.id as string | undefined;
    if (!email) return NextResponse.json("Not authenticated", { status: 401 });

    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json("Password must be at least 8 characters", {
        status: 400,
      });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const hash = await bcrypt.hash(password, 10);
    // Update by unique email to avoid id mismatch issues
    await db.user.update({ where: { email }, data: { password: hash } });
    return NextResponse.json("Password set", { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json("Failed to set password", { status: 500 });
  }
}
