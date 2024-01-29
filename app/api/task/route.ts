import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const pid = body.pid

        const project = await db.project.findFirst({
            where: {
                id: pid as string
            },
            include: {
                tasks: {
                    include: {
                        SubTask: true,
                        assignedTo: true
                    }
                }
            }
        })
        return NextResponse.json(project?.tasks, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}