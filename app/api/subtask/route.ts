import { db } from "@/app/lib/prisma";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        // const result = await db.subTask.create({
        //     data: {
        //         title: body.title,
        //         taskId: body.taskId
        //     }
        // })

        // console.log(result)
        console.log(body)
        // const task = await db.create
        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}