import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const project = await db.project.findFirst({
            where: {
                id: body.projectId
            },
            include: {
                createdBy: true // Fetch the user who created the project
            }
        });

        const sender = project?.createdBy

        const userEmails: [] = body?.userEmails || []
        let notFoundUsers: [] = []
        let foundUsers: any = []

        // // Filter email as found and not found
        // Use Promise.all to wait for all asynchronous operations
        await Promise.all(userEmails.map(async (em) => {
            const qData = await db.user.findFirst({
                where: {
                    email: em,
                },
            });

            if (!qData) {
                notFoundUsers.push(em);
            } else {
                let temp = await db.user.findFirst({
                    where: {
                        email: em
                    }
                })
                foundUsers.push({ id: temp?.id });
            }
        }));

        const updatedProject = await db.project.update({
            where: {
                id: body.projectId
            },
            data: {
                users: {
                    connect: foundUsers
                },
            }
        })


        // Send invitation for emails that were not found
        for (const em of notFoundUsers) {
            await fetch('http://localhost:3000/api/mailer', {
                method: "POST",
                body: JSON.stringify({
                    to: em,
                    subject: "Task Mate - Invitation to project",
                    text: `You have been invited to join Project - ${body?.title} by ${sender?.firstName}. Go to https://task-mate-pro.vercel.app/ and start collaborating! Project id: ${updatedProject.id}`
                })
            })
        }

        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({}, { status: 500 })
    }
}
