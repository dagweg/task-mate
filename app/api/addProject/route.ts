import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { db } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Resolve creatorId
    let creatorId = body?.creatorId as string | undefined;
    if (!creatorId) {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email ?? undefined;
      if (email) {
        const user = await db.user.findUnique({ where: { email } });
        creatorId = user?.id;
      }
    }

    if (!body.title) {
      return NextResponse.json(
        "A project must have a title. Please try again.",
        { status: 400 }
      );
    }

    // THe project creator
    if (!creatorId) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }
    const sender = await db.user.findFirst({ where: { id: creatorId } });

    const userEmails: [] = body?.users || [];
    let notFoundUsers: [] = [];
    let foundUsers: any = [];

    // // Filter email as found and not found
    // Use Promise.all to wait for all asynchronous operations
    await Promise.all(
      userEmails.map(async (em) => {
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
              email: em,
            },
          });
          foundUsers.push({ id: temp?.id });
        }
      })
    );

    let project = await db.project.create({
      data: {
        title: body?.title,
        description: body?.description,
        creatorId: creatorId,
        users: {
          connect: foundUsers,
        },
        coverImage: "",
      },
    });

    // Send invitation for emails that were not found
    for (const em of notFoundUsers) {
      await fetch("http://localhost:3000/api/mailer", {
        method: "POST",
        body: JSON.stringify({
          to: em,
          subject: "Task Mate - Invitation to project",
          text: `You have been invited to join Project - ${body?.title} by ${sender?.firstName}. Go to https://task-mate-pro.vercel.app/ and start collaborating! Project id: ${project.id}`,
        }),
      });
    }

    console.log(foundUsers);
    console.log(notFoundUsers);
    console.log(sender?.firstName);

    // console.log(project)
    return NextResponse.json({
      notFound: notFoundUsers,
      found: foundUsers,
      status: "Email of invitation sent",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Couldn't create project! Please try again...", {
      status: 500,
    });
  }
}
