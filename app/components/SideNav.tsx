"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BiLogOutCircle, BiSolidDashboard } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { BsFillChatFill, BsStack } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import classNames from "classnames";
import "./sidenav.css";
import { cn } from "../lib/utils";
import { FaHamburger, FaUserAlt } from "react-icons/fa";
import { Button, Dialog } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { MdMore } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { signOut } from "next-auth/react";

function SideNav() {
  const pathname = usePathname();

  const SB_ENABLED = "!w-[250px] transition-all duration-500";
  const SB_DISABLED = "w-fit p-0 m-0  transition-all duration-300";

  const [sideBar, setSideBar] = useState<string>(SB_DISABLED);
  const [user, setUser] = useState<any>();

  const sideBarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const toggleSideBar = () => {
    console.log("clicked");
    if (sideBar === SB_ENABLED) {
      setSideBar(SB_DISABLED);
    } else {
      setSideBar(SB_ENABLED);
    }
  };

  const dialogRef = useRef<any>();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    console.log(SB_ENABLED == sideBar ? "enabled" : "disabled");
  }, [sideBar]);

  // Load user on mount
  useEffect(() => {
    fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        console.log(data);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  // Handle outside click/resize responsive behavior
  useEffect(() => {
    const handleResize = () => setSideBar(SB_DISABLED);
    const handleClick = (e: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        e.x > (sideBarRef.current?.clientWidth || 0) &&
        sideBar === SB_ENABLED
      ) {
        setSideBar(SB_DISABLED);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, [sideBar]);

  return (
    <>
      <div className="md:hidden m-3 fixed w-full z-[100]">
        <div
          className="text-xl p-2 bg-gray-100 w-fit rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => toggleSideBar()}
        >
          {sideBar == SB_DISABLED && <GiHamburgerMenu />}
        </div>
      </div>
      <div
        ref={sideBarRef}
        className={cn(
          " h-screen  absolute text-white z-[100]",
          sideBar == SB_DISABLED ? "hidden" : "flex",
          "md:flex md:relative"
        )}
      >
        <div
          className="md:hidden text-xl p-2 bg-gray-100 w-fit rounded-full hover:bg-gray-200 cursor-pointer absolute z-[100] text-black m-1"
          onClick={() => toggleSideBar()}
        >
          {sideBar == SB_ENABLED && <IoClose />}
        </div>
        <div
          className={cn(
            `relative bg-gray-200 text-black h-full space-y-4 `,
            sideBar,
            SB_DISABLED == sideBar ? "flex flex-col items-center" : ""
          )}
        >
          <div className="user py-5 w-full flex items-center  gap-4  border-b  px-2 m-2">
            {
              <div
                className={cn(
                  "w-full flex  gap-4 items-center",
                  sideBar == SB_ENABLED ? "justify-start" : "justify-center"
                )}
              >
                <div className="p-2  rounded-full">
                  <FaUserAlt className="!text-4xl " />
                </div>
                {sideBar == SB_ENABLED && (
                  <div>
                    <p>{user?.name ?? ""}</p>
                    <p className="text-xs">{user?.email ?? ""}</p>
                  </div>
                )}
              </div>
            }
          </div>

          <nav className={cn(" flex ", sideBar)}>
            <div
              className={cn(
                "flex flex-col h-full space-y-0 px-2 justify-between py-16"
              )}
            >
              <div className="flex flex-col gap-4">
                <Link
                  href={"/dashboard"}
                  className={classNames({
                    "side-nav-button hover:bg-white flex justify-start p-4  px-7 rounded-lg duration-75 gap-2 items-center":
                      true,
                    "bg-white": pathname.includes("dashboard"),
                  })}
                >
                  <BiSolidDashboard className={"scale-150"} />
                  <label
                    htmlFor=""
                    className={cn(SB_DISABLED == sideBar ? "hidden" : "")}
                  >
                    Dashboard
                  </label>
                </Link>
                <Link
                  href={"/projects"}
                  className={classNames({
                    "side-nav-button hover:bg-white flex justify-start p-4  px-7 rounded-lg duration-75 gap-2 items-center":
                      true,
                    "bg-white": pathname.includes("projects"),
                  })}
                >
                  <AiOutlineProject className={"scale-150"} />
                  <label
                    htmlFor=""
                    className={cn(SB_DISABLED == sideBar ? "hidden" : "")}
                  >
                    Projects
                  </label>
                </Link>
                <Link
                  href={"/settings/account-settings"}
                  className={classNames({
                    "side-nav-button  hover:bg-white flex justify-start p-4  px-7 rounded-lg duration-75 gap-2 items-center":
                      true,
                    "bg-white": pathname.includes("settings"),
                  })}
                >
                  <FiSettings className={"scale-150"} />
                  <label
                    htmlFor=""
                    className={cn(SB_DISABLED == sideBar ? "hidden" : "")}
                  >
                    Settings
                  </label>
                </Link>
                <Link
                  href={"/help&info"}
                  className={classNames({
                    "side-nav-button  hover:bg-white flex justify-start p-4  px-7 rounded-lg duration-75 gap-2 items-center":
                      true,
                    "bg-white": pathname.includes("help&info"),
                  })}
                >
                  <FiHelpCircle className={"scale-150"} />
                  <label
                    htmlFor=""
                    className={cn(SB_DISABLED == sideBar ? "hidden" : "")}
                  >
                    Help & Information
                  </label>
                </Link>
                <div
                  className="side-nav-button  hover:bg-white flex justify-start p-4  px-7 rounded-lg duration-75 gap-2 items-center"
                  onClick={() => dialogRef.current.click()}
                >
                  <BiLogOut className={"scale-150"} />
                  <label
                    htmlFor=""
                    className={cn(SB_DISABLED == sideBar ? "hidden" : "")}
                  >
                    Logout
                  </label>
                </div>
              </div>
            </div>
          </nav>
          <div
            className={cn(
              "h-[10%] w-full flex flex-col justify-center items-center text-[#a29eae]",
              sideBar == SB_DISABLED ? "hidden" : ""
            )}
          >
            <h1 className="text-2xl font-bold tracking-wide ">
              <i></i>TaskMate
            </h1>
            <p>Alpha Build</p>
          </div>
        </div>
        <div
          className={`${classNames({
            "h-full flex flex-col justify-center overflow-visible w-0 cursor-pointer  duration-200 ":
              true,
          })}`}
          onClick={toggleSideBar}
        >
          <i
            className={classNames({
              "fa-solid absolute  text-black cursor-pointer active:scale-95 p-3 duration-150":
                true,
              "fa-angles-right rounded-r-full hover:bg-gray-200 hover:shadow-2xl":
                sideBar === SB_DISABLED,
              "fa-angles-left rounded-l-full -translate-x-10 text-white hover:bg-white hover:bg-opacity-20 hover:shadow-2xl":
                sideBar === SB_ENABLED,
            })}
            onClick={toggleSideBar}
          ></i>
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button ref={dialogRef} className="hidden w-10 h-10"></button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>
            <div className="flex gap-2 items-center">
              <BiLogOutCircle />
              <p>Confirm Logout</p>
            </div>
          </Dialog.Title>
          <Dialog.Description>
            <p className="py-4">Are you sure you want to logout?</p>
          </Dialog.Description>
          <div className="flex gap-2 py-2">
            <Dialog.Close>
              <Button className="!bg-gray-50 !text-black hover:!bg-gray-200 !shadow-sm">
                No
              </Button>
            </Dialog.Close>
            <Button
              className="!bg-gray-50 !text-black hover:!bg-gray-200 !shadow-sm"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default SideNav;
