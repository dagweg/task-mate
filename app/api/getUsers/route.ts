import supabase from "@/app/config/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const users = await db.user.findMany({
            where: {
                email: {
                    contains: data.email
                },
                projectId: data.projectId
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        console.log(error)
    }
}