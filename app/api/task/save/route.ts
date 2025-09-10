import { db } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const subTasks = body.subTasks;

    const updated = await db.task.upsert({
      where: {
        id: body.taskId,
        projectId: body.projectId,
      },
      update: {
        title: body.title as string,
        description: body.description as string,
      },
      create: {
        id: body.taskId as string,
        title: body.title as string,
        description: body.description as string,
        projectId: body.projectId as string,
        dueDate: new Date(), // Provide a valid due date here
      },
      include: {
        SubTask: true,
      },
    });

    for (let subTask of subTasks) {
      const subtask = await db.subTask.upsert({
        where: {
          id: subTask.id,
        },
        update: {
          title: subTask.title,
          progress: subTask.progress,
        },
        create: {
          title: subTask.title as string,
          taskId: body.taskId,
          id: subTask.id as string,
        },
      });
    }
    const fresh = await db.task.findUnique({
      where: { id: updated.id },
      include: { SubTask: true, assignedTo: true },
    });
    return NextResponse.json(fresh, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({}, { status: 500 });
  }
}
