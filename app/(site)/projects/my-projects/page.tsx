"use client";

import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { getAppToken } from "@/app/lib/auth-client";

function MyProjects() {
  const [projects, setProjects] = useState<ReactElement[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = await getAppToken();
      fetch(`/api/getProjects`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: JSON.stringify({}),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            setProjects((prev) => data);
          }
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchProjects();
  }, []);

  return (
    <div
      className={cn(
        projects.length > 0 &&
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-full gap-6"
      )}
    >
      {projects.length === 0 ? (
        <div className="w-full flex flex-col my-20 items-center mx-auto">
          <div className="bg-gray-100 text-black w-fit h-fit p-3 px-5 rounded-lg border border-gray-200">
            Nothing to show here. <br />
            Get started by adding a project...
          </div>
        </div>
      ) : (
        [...projects].map((project: any, index: number) => (
          <Link
            href={`/project/AddTasks?pname=${project.title}&pid=${project.id}`}
            key={index}
          >
            <div className="flex flex-col justify-between overflow-hidden bg-white w-full h-fit max-w-[500px] p-6 rounded-xl shadow-sm border border-gray-200 hover:scale-[101%] duration-200 hover:border-gray-400 hover:shadow-md cursor-pointer active:scale-100">
              <h1 className="font-bold tracking-wide text-xl py-2">
                {project.title}
              </h1>
              <p className="text-sm text-gray-600 line-clamp-3">
                {project.description}
              </p>
              <div className="bg-gray-100 w-fit p-2 rounded-lg font-medium shadow-sm mt-6 text-xs border border-gray-200">
                {project.users.length} Members
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default MyProjects;

// (
//   [...projects].map((project: any, index: number) => (
//     <Link
//       href={`/project/AddTasks?pname=${project.title}&pid=${project.id}`}
//       key={index}
//     >
//       <div className="flex flex-col justify-around cols-span-1  overflow-hidden bg-[#a6a1b1] w-full h-fit max-w-[500px] p-7 rounded-[10px] shadow-sm bg-opacity-10 hover:scale-[101%] duration-200 hover:bg-white border-2 hover:border-slate-500 hover:shadow-2xl cursor-pointer active:scale-100">
//         <h1 className="font-bold tracking-wide text-xl py-2">
//           {project.title}
//         </h1>
//         <p className="text-xs text-justify ">{project.description}</p>
//         <div className="bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8 text-xs">
//           {project.users.length} Members
//         </div>
//       </div>
//     </Link>
//   ))
// )}
