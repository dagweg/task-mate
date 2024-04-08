"use client";
import React, { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import "./layout.css";
import Link from "next/link";
import classNames from "classnames";
import { IoAdd } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";
import { BiAddToQueue, BiChat, BiUser } from "react-icons/bi";
import { MdCardMembership } from "react-icons/md";
import { RiTeamFill, RiTeamLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";

function ProjectLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectdId = searchParams.get("pid");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex gap-4 bg-slate-50 p-2 rounded-lg shadow-sm ">
        {
          <Link href={`/project/AddTasks?pid=${projectdId}`}>
            {" "}
            <p
              className={classNames({
                "min-w-fit  min-h-fit rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer":
                  true,
                "bg-slate-200": pathname.includes("AddTasks"),
              })}
            >
              <BiAddToQueue className="md:hidden" />{" "}
              <span className="md:flex hidden">Add Task</span>
            </p>
          </Link>
        }
        <Link href={`/project/ViewTasks?pid=${projectdId}`}>
          <p
            className={classNames({
              "min-w-fit  min-h-fit rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer":
                true,
              "bg-slate-200": pathname.includes("ViewTasks"),
            })}
          >
            <FaTasks className="md:hidden" />{" "}
            <span className="md:flex hidden">View Tasks</span>
          </p>
        </Link>
        <Link href={`/project/chat?pid=${projectdId}`}>
          {" "}
          <p
            className={classNames({
              "min-w-fit  min-h-fit rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer":
                true,
              "bg-slate-200": pathname.includes("chat"),
            })}
          >
            <BiChat className="md:hidden" />{" "}
            <span className="md:flex hidden">Chat</span>
          </p>
        </Link>
        <Link href={`./members?pid=${projectdId}`}>
          <p
            className={classNames({
              "min-w-fit  min-h-fit rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer":
                true,
              "bg-slate-200": pathname.includes("members"),
            })}
          >
            <RiTeamLine className="md:hidden" />{" "}
            <span className="md:flex hidden">Members</span>
          </p>
        </Link>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default ProjectLayout;
