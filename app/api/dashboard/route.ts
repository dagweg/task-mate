import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import { db } from "@/app/lib/prisma";

async function buildDashboard(userId: string) {
  const [projectCount, projects, totalTasks, notStarted, inProgress, finished] =
    await Promise.all([
      db.project.count({ where: { creatorId: userId } }),
      db.project.findMany({
        where: { creatorId: userId },
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          _count: { select: { tasks: true } },
        },
      }),
      db.task.count({ where: { project: { creatorId: userId } } }),
      db.task.count({
        where: { project: { creatorId: userId }, progress: "NOT_STARTED" },
      }),
      db.task.count({
        where: { project: { creatorId: userId }, progress: "IN_PROGRESS" },
      }),
      db.task.count({
        where: { project: { creatorId: userId }, progress: "FINISHED" },
      }),
    ]);

  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 14);
  const upcomingTasks = await db.task.findMany({
    where: {
      project: { creatorId: userId },
      dueDate: { gte: now, lte: nextWeek },
    },
    orderBy: { dueDate: "asc" },
    take: 6,
    select: {
      id: true,
      title: true,
      dueDate: true,
      progress: true,
      project: { select: { id: true, title: true } },
    },
  });

  return {
    projects,
    metrics: {
      projects: projectCount,
      tasks: { total: totalTasks, notStarted, inProgress, finished },
    },
    upcomingTasks,
  };
}

export async function GET(req: NextRequest) {
  try {
    // Only try to read session if a next-auth cookie exists (avoid JWE errors when NO_SECRET)
    const hasSessionCookie =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token") ||
      req.cookies.get("next-auth.session-token.0");

    if (!hasSessionCookie)
      return NextResponse.json("Not authenticated", { status: 401 });

    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? undefined;
    if (!email) return NextResponse.json("Not authenticated", { status: 401 });
    const user = await db.user.findUnique({ where: { email } });
    if (!user?.id) return NextResponse.json("User not found", { status: 404 });
    const payload = await buildDashboard(user.id);
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error building dashboard", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const uid = (body?.uid as string | undefined) ?? undefined;
    if (!uid) return NextResponse.json("Not authenticated", { status: 401 });
    const user = await db.user.findUnique({ where: { id: uid } });
    if (!user?.id) return NextResponse.json("User not found", { status: 404 });
    const payload = await buildDashboard(user.id);
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error building dashboard", { status: 500 });
  }
}
