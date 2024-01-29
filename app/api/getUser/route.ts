import supabase from "@/app/config/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const users = await db.user.findFirst({
            where: {
                id: body?.uid as string
            }
        })
        return NextResponse.json({
            name: users?.firstName
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("error", { status: 500 })
    }
}