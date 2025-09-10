import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { verifyAppToken } from "@/app/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({} as any));
    let userId: string | undefined = body.uid;
    if (!userId) {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email ?? undefined;
      if (email) {
        const u = await db.user.findUnique({ where: { email } });
        userId = u?.id;
      }
    }
    if (!userId) {
      const auth = request.headers.get("authorization") || undefined;
      const payload = await verifyAppToken(auth || undefined);
      if (payload?.sub) userId = payload.sub as string;
    }
    if (!userId) return NextResponse.json("Not authenticated", { status: 401 });
    const projects = await db.project.findMany({
      where: {
        users: {
          some: {
            id: userId as string,
          },
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error fetching projects", { status: 500 });
  }
}
