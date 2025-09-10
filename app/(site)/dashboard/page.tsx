"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./dashboard.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

type DashboardData = {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
    _count: { tasks: number };
  }>;
  metrics: {
    projects: number;
    tasks: {
      total: number;
      notStarted: number;
      inProgress: number;
      finished: number;
    };
  };
  upcomingTasks: Array<{
    id: string;
    title: string;
    dueDate: string;
    progress: "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
    project: { id: string; title: string };
  }>;
};

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function ProgressBadge({
  state,
}: {
  state: "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
}) {
  const map = {
    NOT_STARTED: "bg-gray-100 text-gray-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    FINISHED: "bg-green-100 text-green-700",
  } as const;
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${map[state]}`}>
      {state.replace("_", " ")}
    </span>
  );
}

function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pwPrompt, setPwPrompt] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/dashboard");
        if (!r.ok) throw new Error(await r.text());
        const d = await r.json();
        setData(d);
        // Lightweight check: ask server if password is set
        const me = await fetch("/api/getUser", { method: "POST" });
        if (me.ok) {
          const u = await me.json();
          // We don't expose password here; call a tiny headless endpoint to decide if null
          const chk = await fetch("/api/user/password-set", { method: "GET" });
          if (chk.ok) {
            const yes = await chk.json();
            if (!yes?.set)
              setPwPrompt("Secure your account by setting a password.");
          }
        }
      } catch (e: any) {
        setError(
          typeof e?.message === "string"
            ? e.message
            : "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const taskPercent = useMemo(() => {
    const total = data?.metrics.tasks.total ?? 0;
    if (!total) return { ns: 0, ip: 0, fin: 0 };
    return {
      ns: Math.round(((data!.metrics.tasks.notStarted || 0) / total) * 100),
      ip: Math.round(((data!.metrics.tasks.inProgress || 0) / total) * 100),
      fin: Math.round(((data!.metrics.tasks.finished || 0) / total) * 100),
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-8 min-h-screen w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/projects/add"
            className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-black"
          >
            New Project
          </Link>
          <Link
            href="/projects"
            className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50"
          >
            View Projects
          </Link>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Loading your dashboard…</div>
      )}
      {error && (
        <div className="text-sm text-red-600">
          {error}
          {error.includes("Not authenticated") && (
            <span>
              {" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>{" "}
              to view your dashboard.
            </span>
          )}
        </div>
      )}

      {data && (
        <>
          {pwPrompt && (
            <div className="rounded-lg border bg-yellow-50 text-yellow-900 p-3 text-sm">
              {pwPrompt}{" "}
              <Link href="/settings/account-settings" className="underline">
                Set password
              </Link>
            </div>
          )}
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Projects" value={data.metrics.projects} />
            <Stat
              label="Tasks"
              value={data.metrics.tasks.total}
              sub={`${taskPercent.fin}% done`}
            />
            <Stat
              label="In Progress"
              value={data.metrics.tasks.inProgress}
              sub={`${taskPercent.ip}% of total`}
            />
            <Stat
              label="Not Started"
              value={data.metrics.tasks.notStarted}
              sub={`${taskPercent.ns}% of total`}
            />
          </div>

          {/* Recent Projects */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recent projects</h2>
              <Link
                href="/projects"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                See all
              </Link>
            </div>
            {data.projects.length === 0 ? (
              <div className="rounded-xl border p-6 text-sm text-gray-500">
                No projects yet. Create your first one.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {data.projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/project/ViewTasks?pid=${p.id}`}
                    className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {p.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {p._count.tasks} tasks
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming tasks */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Upcoming tasks</h2>
              <Link
                href="/projects"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Plan tasks
              </Link>
            </div>
            {data.upcomingTasks.length === 0 ? (
              <div className="rounded-xl border p-6 text-sm text-gray-500">
                No upcoming tasks in the next 2 weeks.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {data.upcomingTasks.map((t) => (
                  <Link
                    key={t.id}
                    href={`/project/ViewTasks?pid=${t.project.id}`}
                    className="rounded-xl border bg-white p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t.title}</h3>
                        <p className="text-xs text-gray-500">
                          {t.project.title}
                        </p>
                      </div>
                      <ProgressBadge state={t.progress} />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Due {new Date(t.dueDate).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
