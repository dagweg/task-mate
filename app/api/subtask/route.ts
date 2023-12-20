import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const pid = req.nextUrl.searchParams.get('pid')
        const taskId = req.nextUrl.searchParams.get('tid')
        const subTaskName = req.nextUrl.searchParams.get('sname')

        const updatedTask = await db.task.update({
            where: {
                id: taskId as string,
            },
            data: {
                SubTask: {
                    create: {
                        title: subTaskName as string
                    },
                },
            },
            include: {
                SubTask: true,
            },
        });
        console.log(updatedTask)
        return NextResponse.json(updatedTask?.SubTask, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}