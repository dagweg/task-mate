import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const result = await db.task.create({
            data: {
                title: body.title,
                dueDate: new Date(),
                projectId: body.projectId
            }
        })

        console.log(result)
        // const task = await db.create
        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}