import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const subTasks = body.subTasks

        const updated = await db.task.upsert({
            where: {
                id: body.taskId,
                projectId: body.projectId
            },
            update: {
                title: body.title as string,
                description: body.description as string
            },
            create: {
                title: body.title as string,
                description: body.description as string,
                projectId: body.projectId as string,
                dueDate: new Date() // Provide a valid due date here
            },
            include: {
                SubTask: true
            }
        })

        for (let subTask of subTasks) {
            const subtask = await db.subTask.upsert({
                where: {
                    taskId: body.taskId,
                    id: subTask.id,
                },
                update: {
                    title: subTask.title,
                    progress: subTask.progress,
                },
                create: {
                    title: subTask.title as string,
                    taskId: body.taskId
                }

            })
        }



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