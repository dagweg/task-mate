import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const pid = req.nextUrl.searchParams.get('pid')
        const taskId = req.nextUrl.searchParams.get('tid')
        const subTaskName = req.nextUrl.searchParams.get('sname')
        const subTaskId = req.nextUrl.searchParams.get('subTaskId')

        const subTask = await db.subTask.upsert({
            where: {
                id: subTaskId as string,
                taskId: taskId as string
            },
            update: {
                title: subTaskName as string
            },
            create: {
                title: subTaskName as string,
                taskId: taskId as string,
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