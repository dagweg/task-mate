import React, { ReactNode } from "react";
import TopNav from "@/app/components/TopNav";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-2   flex flex-col gap-8 min-h-screen">
      <div className="flex flex-col w-full gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Settings
        </h1>
        <TopNav
          links={[
            { label: "Account Settings", link: "/settings/account-settings" },
          ]}
        />
      </div>
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
}

export default layout;
