import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {

    } catch (error) {
        return NextResponse.json("Couldn't add task!", { status: 500 });
    }
}
