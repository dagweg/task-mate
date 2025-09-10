"use client";

import TextBox from "@/app/components/TextBox";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Dialog, DialogContent, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { getProviders, signIn } from "next-auth/react";

function SignUp() {
  const [message, setMessage] = useState<string>(
    "Account created successfully!"
  );
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    passWord: false,
    confirmPassWord: false,
  });

  const dialogRef = useRef<any>(null);

  useEffect(() => {
    getProviders()
      .then((p) => setProviders(p))
      .finally(() => setLoadingProviders(false));
  }, []);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof typeof formData, string>> = {};
    const email = formData.email.trim();
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!formData.passWord) e.passWord = "Password is required";
    else if (formData.passWord.length < 6)
      e.passWord = "Password must be at least 6 characters";
    if (!formData.confirmPassWord) e.confirmPassWord = "Confirm your password";
    else if (formData.confirmPassWord !== formData.passWord)
      e.confirmPassWord = "Passwords do not match";
    return e;
  }, [formData]);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        passWord: true,
        confirmPassWord: true,
      });
      return;
    }
    fetch("/api/addUser/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        setAccountCreated(true);
        setMessage("Account created successfully!");
        dialogRef.current?.click();
      } else {
        setMessage(
          typeof data === "string" ? data : "Account creation failed!"
        );
        dialogRef.current?.click();
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button ref={dialogRef} className="hidden" aria-hidden />
        </Dialog.Trigger>
        <DialogContent
          style={{ maxWidth: 450 }}
          className="flex flex-col justify-center items-center "
        >
          <Dialog.Title>{message}</Dialog.Title>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                {accountCreated ? "Close" : "Ok"}
              </Button>
            </Dialog.Close>
            {accountCreated && (
              <Link href="/login">
                <Button className="!bg-gray-300 !text-black hover:!bg-dark2 hover:!text-white ">
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </DialogContent>
      </Dialog.Root>

      <div className="relative mx-auto w-full max-w-[960px] border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 bg-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 mb-6">Join Task Mate</p>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-4 w-full"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextBox
                  placeholder="First Name"
                  className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                  onChange={(e: any) => handleInputChange(e, "firstName")}
                  onBlur={() => handleBlur("firstName")}
                  currentValue={formData.firstName}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-xs text-red-600 -mt-2 md:col-span-2">
                    {errors.firstName}
                  </p>
                )}
                <TextBox
                  placeholder="Last Name"
                  className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                  onChange={(e: any) => handleInputChange(e, "lastName")}
                  onBlur={() => handleBlur("lastName")}
                  currentValue={formData.lastName}
                />
              </div>
              <TextBox
                placeholder="Email"
                className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                onChange={(e: any) => handleInputChange(e, "email")}
                onBlur={() => handleBlur("email")}
                currentValue={formData.email}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-600 -mt-2">{errors.email}</p>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <TextBox
                  placeholder="Password"
                  type="password"
                  className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                  onChange={(e: any) => handleInputChange(e, "passWord")}
                  onBlur={() => handleBlur("passWord")}
                  currentValue={formData.passWord}
                />
                <TextBox
                  placeholder="Confirm Password"
                  type="password"
                  className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10"
                  onChange={(e: any) => handleInputChange(e, "confirmPassWord")}
                  onBlur={() => handleBlur("confirmPassWord")}
                  currentValue={formData.confirmPassWord}
                />
              </div>
              <div className="grid gap-2">
                {touched.passWord && errors.passWord && (
                  <p className="text-xs text-red-600 -mt-2">
                    {errors.passWord}
                  </p>
                )}
                {touched.confirmPassWord && errors.confirmPassWord && (
                  <p className="text-xs text-red-600 -mt-2">
                    {errors.confirmPassWord}
                  </p>
                )}
              </div>
              <input
                type="submit"
                value="Create Account"
                className={cn(
                  `bg-slate-600 text-white py-3 duration-150 transition w-full font-semibold !rounded-lg my-2 ${
                    isValid
                      ? "cursor-pointer hover:bg-slate-800"
                      : "opacity-60 cursor-not-allowed"
                  }`
                )}
                disabled={!isValid}
              />
              <p className="flex gap-2 text-sm">
                Already have an account?
                <Link
                  href="/login"
                  className="font-semibold flex flex-col w-fit group "
                >
                  Sign in
                  <span className="scale-x-0 duration-100 origin-center bg-black h-[2px] group-hover:scale-x-100"></span>
                </Link>
              </p>
            </form>

            <div className="flex items-center w-full my-6">
              <div className="flex-grow bg-gray-200 h-px" />
              <div className="px-4 text-xs text-gray-500">OR CONTINUE WITH</div>
              <div className="flex-grow bg-gray-200 h-px" />
            </div>
            <div className="flex flex-col gap-3">
              {loadingProviders && (
                <div className="text-sm text-gray-500">Loading providers…</div>
              )}
              {!loadingProviders && providers && (
                <>
                  {providers.google && (
                    <button
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="bg-[#4285F4]  cursor-pointer text-white py-3 hover:bg-[#3367D6] duration-150 transition w-full font-semibold !rounded-lg"
                    >
                      Continue with Google
                    </button>
                  )}
                  {providers.github && (
                    <button
                      onClick={() => signIn("github", { callbackUrl: "/" })}
                      className="bg-gray-900  cursor-pointer text-white py-3 hover:bg-black duration-150 transition w-full font-semibold !rounded-lg"
                    >
                      Continue with GitHub
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block bg-gray-50 p-8 md:p-12 border-l">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Everything you need to start
                </h2>
                <p className="text-gray-600">
                  Create projects, invite teammates, and manage tasks in one
                  place.
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-gray-700 text-sm list-disc pl-6">
                <li>Invite-only access controls</li>
                <li>Task lists and subtasks</li>
                <li>Simple dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
