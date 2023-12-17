import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()


        let createdTask = await db.task.create({
            data: {
                id: body.id,
                title: body.title,
                projectId: body?.projectId,
                dueDate: body?.dueDate,
            }
        })


        console.log(body)
        return NextResponse.json({ ...body })
    } catch (error) {
        return NextResponse.json("Couldn't add task!", { status: 500 });
    }
}
