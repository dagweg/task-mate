"use client";

import ButtonRound from "@/app/components/ButtonRound";
import TextList from "@/app/components/TextList";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { BsInfoSquare } from "react-icons/bs";

function AddProject() {
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const titleRef = useRef<any>();
  const descRef = useRef<any>();
  const dialogRef = useRef<any>();

  function handleCreateProject() {
    const formData = {
      title: titleRef.current.value,
      description: descRef.current?.value,
      creatorId: window?.localStorage.getItem("userId"),
      users: userEmails,
    };

    console.log(JSON.stringify(formData));

    fetch("/api/addProject", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        console.log("Project Created Successfully");
        setMessage((prev) => "Project Created Successfully");
        dialogRef.current.click();
      } else {
        console.log("X Project creation unsuccessful");
        setMessage((prev) => data);
        dialogRef.current.click();
      }
    });
  }

  return (
    <div className="flex ">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button ref={dialogRef} className="!hidden"></Button>
        </Dialog.Trigger>
        <Dialog.Content
          style={{ maxWidth: 450 }}
          className="flex flex-col justify-center items-center "
        >
          <Dialog.Title>{message}</Dialog.Title>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Ok
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <div className="w-full h-fit relative rounded-2xl space-y-20 gap-20 max-w-7xl py-8">
        <div className="flex flex-col gap-4  max-w-[650px]">
          <div>
            <p>Project Title</p>
            <input
              type="text"
              placeholder=""
              className="border-black border-[1px] p-2 w-full"
              ref={titleRef}
            />
          </div>
          <div className="text-field flex flex-col">
            <label htmlFor="">Project Description</label>
            <textarea
              name=""
              id=""
              rows={30}
              ref={descRef}
              className="outline-none border border-black h-28  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-10 justify-center ">
          <div className="max-w-[650px]">
            <h1 className="font-semibold">Add team members</h1>
            <div className="flex flex-col gap-3 justify-center my-2">
              <div className="flex gap-4 items-center">
                <BsInfoSquare />
                <p className="text-sm">
                  To add members write their email address and press [Enter].
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <BsInfoSquare />
                <p className="text-sm">
                  To remove members click on the email you just added.
                </p>
              </div>
            </div>
            <div className="flex gap-1  max-w-full">
              <TextList emailList={userEmails} setEmailList={setUserEmails} />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <ButtonRound
              label="Finish"
              className="!px-10"
              onClick={handleCreateProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
