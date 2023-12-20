import { NextResponse, NextRequest } from "next/server";
import { db } from '@/app/lib/prisma'
import { connect } from "http2";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (body.invite === '') {
            return NextResponse.json('Invite cant be empty', { status: 400 })
        }

        const user = await db.user.findFirst({
            where: {
                id: body.userId
            }
        });

        if (!user) {
            return NextResponse.json('User not found', { status: 404 });
        }

        const project = await db.project.update({
            where: {
                id: body.invite
            },
            data: {
                users: {
                    connect: { id: user.id }
                }
            }
        });

        console.log(body)
        console.log(project)
        return NextResponse.json('Join Success', { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Error Joining Project", { status: 500 })
    }

}