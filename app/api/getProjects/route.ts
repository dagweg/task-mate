import { NextResponse, NextRequest } from "next/server";
import { db } from '@/app/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const projects = await db.project.findMany({
            where: {
                creatorId: body?.userId
            }
        })
        return NextResponse.json(projects, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Error fetching projects", { status: 500 })
    }

}