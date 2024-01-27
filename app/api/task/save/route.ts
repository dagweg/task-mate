import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const subTasks = body.subTasks

        for (let subTask of subTasks) {
            const subtask = await db.subTask.update({
                data: {
                    title: subTask.title,
                    progress: subTask.progress,
                },
                where: {
                    taskId: body.taskId,
                    id: subTask.id,
                }
            })
        }

        const updated = await db.task.update({
            data: {
                title: body.title as string,
                description: body.description as string
            },
            where: {
                id: body.taskId,
                projectId: body.projectId
            }
        })

        console.log(updated)

        return NextResponse.json({}, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({}, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const pid = req.nextUrl.searchParams.get('pid')



        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}