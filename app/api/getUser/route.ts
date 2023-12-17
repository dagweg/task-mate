import supabase from "@/app/config/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const users = await db.user.findFirst({
            where: {
                id: body?.userId
            }
        })
        return NextResponse.json(users?.firstName)
    } catch (error) {
        console.log(error)
    }
}