import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/app/lib/prisma";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? undefined;
    if (!email) return NextResponse.json({ set: false }, { status: 200 });
    const user = await db.user.findUnique({
      where: { email },
      select: { password: true },
    });
    return NextResponse.json({ set: !!user?.password }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ set: false }, { status: 200 });
  }
}
