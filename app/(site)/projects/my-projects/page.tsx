"use client";

import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";

function MyProjects() {
  const [projects, setProjects] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchProjects = async () => {
        fetch(`/api/getProjects`, {
          method: "POST",
          body: JSON.stringify({
            creatorId: window?.localStorage.getItem("userId"),
          }),
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
    }
  }, []);

  return (
    <div
      className={cn(
        projects.length !== 0 &&
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center  w-full bg-red-50  gap-8 relative"
      )}
    >
      {projects.length !== 0 ? (
        <div className="w-full   flex flex-col my-60 items-center  mx-auto absolute ">
          <div className="bg-gray-100 text-black w-fit h-fit p-3 px-5 rounded-lg ">
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
            <div className="flex flex-col justify-around cols-span-1  overflow-hidden bg-[#a6a1b1] w-full h-fit max-w-[500px] p-7 rounded-[10px] shadow-sm bg-opacity-10 hover:scale-[101%] duration-200 hover:bg-white border-2 hover:border-slate-500 hover:shadow-2xl cursor-pointer active:scale-100">
              <h1 className="font-bold tracking-wide text-xl py-2">
                {project.title}
              </h1>
              <p className="text-xs text-justify ">{project.description}</p>
              <div className="bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8 text-xs">
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
