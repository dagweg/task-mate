"use client";

import TextBox from "@/app/components/TextBox";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Dialog, DialogContent, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

function SignUp() {
  const [countryCode, setCountryCode] = useState([]);
  const [message, setMessage] = useState<string>(
    "Account created successfully!"
  );
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
    countryCode: "",
    phoneNumber: "",
    licenseAndTerms: false,
  });

  const dialogRef = useRef<any>();

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.passWord !== formData.confirmPassWord) {
      setMessage("Passwords don't match. Please try again!");
      dialogRef.current.click();
      return;
    }

    fetch("/api/addUser/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        console.log("Registerd Successfully");
        setAccountCreated(true);
        setMessage("Account created successfully!");
        dialogRef.current.click();
      } else {
        console.log(data);

        setMessage("Account creation failed!");
        dialogRef.current.click();
      }
    });
  };

  const handleInputChange = (e: any, field: string) => {
    setFormData((prev: typeof formData) => {
      const updatedFormData = {
        ...prev,
        [field]: e.target.value,
      };
      return updatedFormData;
    });
  };

  useEffect(() => {
    async function fetchCountryCodes() {
      fetch("https://restcountries.com/v3.1/all?fields=name,flags,idd", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCountryCode(data);
        });
    }
    fetchCountryCodes();
  }, []);

  return (
    <>
      <div>
        <div className="relative mx-auto min-w-[500px] w-fit h-fit min-h-[300px] border-[1px] shadow-md rounded-md  bg-white bg-opacity-50 backdrop-blur-lg  group/main">
          <div className="bg-slate-400 absolute inset-0 z-[0] scale-[1] scale-x-[1.01] group-hover/main:bg-gray-800    origin-center  rounded-md duration-300"></div>
          <div className="relative bg-white inset-0 h-full flex flex-col md:flex-row items-center justify-center gap-10 px-24 py-10 rounded-md z-[10]">
            <div className="relative  flex flex-col justify-center w-[80%]">
              <h1 className="font-bold text-5xl my-0  text-center">Sign Up</h1>
              <p className="text-center">To Task Mate</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-4  w-full"
            >
              <div className="grid gap-4">
                <div className="flex flex-col">
                  <TextBox
                    placeholder="First Name"
                    className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                    onChange={(e: any) => handleInputChange(e, "firstName")}
                  />
                </div>
                <div className="flex flex-col">
                  <TextBox
                    placeholder="Last Name"
                    className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                    onChange={(e: any) => handleInputChange(e, "lastName")}
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <TextBox
                    placeholder="Email"
                    className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                    onChange={(e: any) => handleInputChange(e, "email")}
                  />
                </div>
                <div className="flex flex-col">
                  <TextBox
                    placeholder="Password"
                    className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                    onChange={(e: any) => handleInputChange(e, "passWord")}
                    type="password"
                  />
                </div>
                <div className="flex flex-col">
                  <TextBox
                    placeholder="Confirm Password"
                    className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                    onChange={(e: any) =>
                      handleInputChange(e, "confirmPassWord")
                    }
                    type="password"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col">
                <div className="flex w-fit bg-red-100">
                  <select
                    className="w-20"
                    onChange={(e: any) => handleInputChange(e, "countryCode")}
                  >
                    {countryCode.map((country: any, index) => (
                      <option key={index}>
                        <span>
                          <label>
                            {country.idd.root}
                            {country.idd.suffixes[0]}
                          </label>
                        </span>
                      </option>
                    ))}
                  </select>
                  <TextBox
                    placeholder="Phonenumber"
                    className="!h-10 max-w-2xl !flex-grow !rounded-md"
                    onChange={(e: any) => handleInputChange(e, "phoneNumber")}
                  />
                </div>
              </div> */}

              <input
                type="submit"
                value={"Create Account"}
                className={cn(
                  "bg-slate-500  cursor-pointer text-white py-3 hover:bg-slate-900 duration-75 transition w-full font-semibold !rounded-lg my-2 max-w-[300px]"
                )}
              ></input>
              <p className="flex gap-2">
                Already have an account?
                <Link
                  href="/login"
                  className="font-semibold flex flex-col w-fit group "
                >
                  Signin
                  <span className="scale-x-0 duration-100 origin-center bg-black h-[2px] group-hover:scale-x-100"></span>
                </Link>
              </p>
            </form>
          </div>
        </div>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button ref={dialogRef}></Button>
          </Dialog.Trigger>
          <DialogContent
            style={{ maxWidth: 450 }}
            className="flex flex-col justify-center items-center "
          >
            <Dialog.Title>{message}</Dialog.Title>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                {accountCreated ? (
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                ) : (
                  <Button variant="soft" color="gray">
                    Ok
                  </Button>
                )}
              </Dialog.Close>
              {accountCreated && (
                <Link href={"/login"}>
                  <Button className="!bg-gray-300 !text-black hover:!bg-dark2 hover:!text-white ">
                    Login
                  </Button>
                </Link>
              )}
            </Flex>
          </DialogContent>
        </Dialog.Root>
      </div>
    </>
  );
}

export default SignUp;
