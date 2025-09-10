import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/app/lib/prisma";
import { verifyAppToken } from "@/app/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let creatorId = body?.creatorId as string | undefined;
    if (!creatorId) {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email ?? undefined;
      if (email) {
        const user = await db.user.findUnique({ where: { email } });
        creatorId = user?.id;
      }
    }
    if (!creatorId) {
      const auth = request.headers.get("authorization") || undefined;
      const payload = await verifyAppToken(auth || undefined);
      if (payload?.sub) creatorId = payload.sub as string;
    }
    if (!creatorId) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }
    const projects = await db.project.findMany({
      where: {
        creatorId: creatorId as string,
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
