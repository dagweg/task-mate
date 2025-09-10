"use client";
import Profile from "@/app/components/Profile";
import React from "react";
import { cn } from "@/app/lib/utils";

function AccountSettings() {
  const [pw1, setPw1] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [msg, setMsg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<{
    name?: string;
    email?: string;
  } | null>(null);

  React.useEffect(() => {
    // Load user profile for header card
    fetch("/api/getUser", { method: "POST" })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const onSave = async () => {
    setMsg(null);
    if (pw1.length < 8) return setMsg("Password must be at least 8 characters");
    if (pw1 !== pw2) return setMsg("Passwords do not match");
    setLoading(true);
    const r = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw1 }),
    });
    if (r.ok) {
      setMsg("Password saved");
      setPw1("");
      setPw2("");
    } else setMsg(await r.text());
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
      <section className="lg:col-span-1">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-4 flex items-center gap-4">
            <Profile
              username={user?.name ?? "Your Name"}
              email={user?.email ?? "you@example.com"}
              imgClass="p-10"
              nmClass="text-lg font-semibold"
              emClass={"!text-xs text-gray-500"}
            />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Manage your personal info.
          </p>
        </div>
      </section>
      <section className="lg:col-span-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-4">Security</h2>
          {msg && (
            <div
              className={cn(
                "mb-3 text-sm",
                msg.includes("saved") ? "text-green-600" : "text-red-600"
              )}
            >
              {msg}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">New password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border border-gray-300 focus:border-gray-500 focus:ring-0 p-2 rounded-md"
                value={pw1}
                onChange={(e) => setPw1(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Confirm password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border border-gray-300 focus:border-gray-500 focus:ring-0 p-2 rounded-md"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={loading}
              className={cn(
                "px-4 py-2 rounded-md bg-slate-900 text-white text-sm",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Saving..." : "Save password"}
            </button>
            <p className="text-xs text-gray-500">Use at least 8 characters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountSettings;
