import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        // Placeholder: implement team member fetch by project if required
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error", { status: 500 });
    }
}