import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { verifyAppToken } from "@/app/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.invite === "") {
      return NextResponse.json("Invite cant be empty", { status: 400 });
    }

    let userId: string | undefined = body.userId as string | undefined;
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
    const user = userId
      ? await db.user.findFirst({ where: { id: userId } })
      : null;

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const project = await db.project.update({
      where: {
        id: body.invite,
      },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json("Join Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error Joining Project", { status: 500 });
  }
}
