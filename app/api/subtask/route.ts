import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const pid = body.pid
        const taskId = body.tid
        const subTaskName = body.sname
        const subTaskId = body.subTaskId

    const subTask = await db.subTask.upsert({
            where: {
        id: subTaskId as string,
            },
            update: {
                title: subTaskName as string
            },
            create: {
                title: subTaskName as string,
                taskId: taskId as string,
        id: subTaskId as string,
            }
        })


        console.log(subTask)
        return NextResponse.json(subTask, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}