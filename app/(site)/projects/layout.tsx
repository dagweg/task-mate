"use client";
import React, { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import ButtonRound from "@/app/components/ButtonRound";
import { GoProjectSymlink } from "react-icons/go";
import { Button, Dialog } from "@radix-ui/themes";
import { Input } from "postcss";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { getAppToken } from "@/app/lib/auth-client";
// import AddProjectDropdownButton from '@/app/components/createProjectButton'

function ProjectsLayout({ children }: { children: ReactNode }) {
  const inviteRef = useRef<any>();
  const dialogRef = useRef<any>();
  const [message, setMessage] = useState<string>("");
  const pathname = usePathname();

  async function handleJoinProject() {
    const token = await getAppToken();
    fetch("/api/joinProject/", {
      method: "POST",
      body: JSON.stringify({
        invite: inviteRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        console.log("Successful Join");
        setMessage(data);
      } else {
        console.log("X Not Successful Join");
        setMessage(data);
      }
      dialogRef.current.click();
      console.log(data);
    });
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button ref={dialogRef} className="!hidden"></Button>
        </Dialog.Trigger>
        <Dialog.Content className="flex flex-col gap-2 !w-[300px]">
          <Dialog.Title className="!text-center">{message}</Dialog.Title>
          <Dialog.Close>
            <Button className="!bg-gray-400 !cursor-pointer hover:!bg-dark2 duration-150">
              Ok
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
      <div className="flex flex-col gap-3 h-fit ">
        <div className="flex flex-col w-full items-start gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Projects
          </h1>
          {/* <AddProjectDropdownButton/> */}
          <div className="flex gap-2">
            <Dialog.Root>
              <Dialog.Trigger>
                <ButtonRound
                  className="flex gap-1 justify-center items-center h-2"
                  label={
                    <>
                      <GoProjectSymlink />
                      Join
                    </>
                  }
                />
              </Dialog.Trigger>
              <Dialog.Content className="flex flex-col gap-2 !w-[300px]">
                <Dialog.Title>Join a Project</Dialog.Title>
                <input
                  placeholder="Invitation Link"
                  className="p-2 w-full border border-gray-300 rounded-md focus:border-gray-500"
                  ref={inviteRef}
                ></input>
                <Dialog.Close>
                  <Button
                    className="!bg-gray-700 !cursor-pointer hover:!bg-gray-900 duration-150 "
                    onClick={handleJoinProject}
                  >
                    Join
                  </Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Root>
            <Link href={"/projects/add"}>
              <ButtonRound
                className="flex gap-1 justify-center items-center h-2"
                label={
                  <>
                    <i className="fa-solid fa-plus mx-1"></i>Add Project
                  </>
                }
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={"/projects/my-projects"}>
            <Button
              className={classNames({
                "!rounded-t-lg  !rounded-b-none  !cursor-pointer  !text-black hover:!bg-gray-300 duration-75":
                  true,
                "!bg-transparent": !pathname.includes("my"),
                "!bg-gray-200": pathname.includes("my-projects"),
              })}
            >
              My projects
            </Button>
          </Link>
          <Link href={"/projects/other-projects"}>
            <Button
              className={classNames({
                "!rounded-t-lg  !rounded-b-none  !cursor-pointer  !text-black hover:!bg-gray-300 duration-75":
                  true,
                "!bg-transparent": !pathname.includes("other"),
                "!bg-gray-200": pathname.includes("other-projects"),
              })}
            >
              Other projects
            </Button>
          </Link>
        </div>
      </div>
      <div className="my-2">{children}</div>
    </>
  );
}

export default ProjectsLayout;
