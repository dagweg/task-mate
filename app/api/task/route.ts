import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}

export async function GET(req: NextRequest) {
    try {
        const pid = req.nextUrl.searchParams.get('pid')

        const project = await db.project.findFirst({
            where: {
                id: pid as string
            },
            include: {
                tasks: {
                    include: {
                        SubTask: true
                    }
                }
            }
        })

        // console.log(project?.tasks)

        return NextResponse.json(project?.tasks, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({})
    }
}