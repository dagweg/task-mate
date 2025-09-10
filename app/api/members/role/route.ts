import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, role } = body as { uid?: string; role?: Role };
    if (!uid || !role) return NextResponse.json("Bad Request", { status: 400 });

    await db.user.update({ where: { id: uid }, data: { role } });
    return NextResponse.json("OK", { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json("Server Error", { status: 500 });
  }
}
