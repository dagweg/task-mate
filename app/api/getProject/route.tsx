import { NextResponse, NextRequest } from "next/server";
import { db } from '@/app/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const project = await db.project.findFirst({
            where: {
                id: body?.projectId
            },
            include: {
                users: true
            }
        })
        console.log(project)
        return NextResponse.json(project, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Error fetching project", { status: 500 })
    }

}