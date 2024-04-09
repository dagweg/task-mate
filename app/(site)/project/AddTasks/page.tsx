"use client";
import TaskPane from "@/app/components/TaskPane";
import TopNav from "@/app/components/TopNav";
import { TaskPaneType } from "@/app/lib/interface";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdAddToPhotos } from "react-icons/md";

function AddTasks() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("pid");
  const [taskPanes, setTaskPanes] = useState<TaskPaneType[]>([]);

  const addTask = () => {
    const newTask: TaskPaneType = {
      id: nanoid(),
      title: "",
      SubTask: [],
      isEditMode: true,
      isFirstTime: true,
      removeTaskPaneCallback: (taskPaneId: string) => {
        const newTaskPanes = taskPanes.filter(
          (taskPane) => taskPane.id != taskPaneId
        );
        setTaskPanes((prev) => newTaskPanes);
      },
    };

    setTaskPanes((prev: TaskPaneType[]) => [...prev, newTask]);
  };

  useEffect(() => {
    fetch(`/api/task?pid=${projectId}`, {
      method: "POST",
      body: JSON.stringify({
        pid: projectId,
      }),
    }).then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        setTaskPanes(data);
      } else {
        console.log("ERROR! Couldn't fetch tasks");
      }
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <TopNav
          links={[
            {
              label: <MdAddToPhotos />,
              link: "#",
              onClickCallback: () => addTask(),
              className:
                "add-new-task relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit text-xl",
            },
          ]}
          className="rounded-sm flex !gap-0 !space-x-0 h-full "
        ></TopNav>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1600px] mx-0 flex-grow rounded-lg px-0">
          <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-4 gap-5">
            {taskPanes.length > 0 &&
              taskPanes.map((taskPane: TaskPaneType, index: any) => (
                <TaskPane key={taskPane.id} {...taskPane} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTasks;
