"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/app/components/TextBox";
import Link from "next/link";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { signIn, getProviders } from "next-auth/react";

// Top-level validation to keep hook deps clean
function validateLogin(data: { email: string; passWord: string }) {
  const newErrors: { email?: string; passWord?: string } = {};
  const email = data.email.trim();
  const pass = data.passWord;

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!pass) {
    newErrors.passWord = "Password is required";
  } else if (pass.length < 6) {
    newErrors.passWord = "Password must be at least 6 characters";
  }
  return newErrors;
}

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
  });

  const [message, setMessage] = useState<string>("");
  const dialogRef = useRef<any>();
  const navigator = useRouter();

  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [touched, setTouched] = useState<{ email: boolean; passWord: boolean }>(
    { email: false, passWord: false }
  );
  // errors are derived from formData

  useEffect(() => {
    getProviders()
      .then((p) => setProviders(p))
      .finally(() => setLoading(false));
  }, []);

  // Validation helpers
  const validate = (data: typeof formData) => {
    const newErrors: { email?: string; passWord?: string } = {};
    const email = data.email.trim();
    const pass = data.passWord;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!pass) {
      newErrors.passWord = "Password is required";
    } else if (pass.length < 6) {
      newErrors.passWord = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const errors = useMemo(() => validateLogin(formData), [formData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const currentErrors = validateLogin(formData);
    if (Object.keys(currentErrors).length > 0) {
      // Mark all fields as touched to reveal errors
      setTouched({ email: true, passWord: true });
      return;
    }

    // Use NextAuth Credentials to set a secure session cookie server-side
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.passWord,
        callbackUrl: "/",
      });
      if (res?.ok) {
        navigator.push("/");
      } else {
        setMessage(res?.error || "Login failed");
        dialogRef.current.click();
      }
    } catch (err: any) {
      setMessage(err?.message || "Login failed");
      dialogRef.current.click();
    }
  };

  const handleInputChange = (e: any, field: string) => {
    setFormData((prev: typeof formData) => {
      const updated = {
        ...prev,
        [field]: e.target.value,
      };
      return updated;
    });
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button ref={dialogRef} className="hidden sr-only" aria-hidden />
        </Dialog.Trigger>
        <Dialog.Content
          style={{ maxWidth: 450 }}
          className="flex flex-col justify-center items-center !z-[100] relative"
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
      <div className="relative mx-auto w-full max-w-[960px] border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 bg-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 mb-6">Sign in to Task Mate</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <TextBox
                placeholder="Email"
                onChange={(e: any) => handleInputChange(e, "email")}
                onBlur={() => handleBlur("email")}
                currentValue={formData.email}
                className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800"
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-600 -mt-2">{errors.email}</p>
              )}
              <TextBox
                placeholder="Password"
                type="password"
                onChange={(e: any) => handleInputChange(e, "passWord")}
                onBlur={() => handleBlur("passWord")}
                currentValue={formData.passWord}
                className="!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800"
              />
              {touched.passWord && errors.passWord && (
                <p className="text-xs text-red-600 -mt-2">{errors.passWord}</p>
              )}
              <input
                type="submit"
                value={"Signin"}
                disabled={!isValid}
                className={`bg-slate-600 text-white py-3 duration-150 transition w-full font-semibold !rounded-lg ${
                  isValid
                    ? "cursor-pointer hover:bg-slate-800"
                    : "opacity-60 cursor-not-allowed"
                }`}
              ></input>

              <p className="text-sm flex gap-2 px-3">
                New to Task Mate?
                <Link
                  href="/signup"
                  className="font-semibold flex flex-col w-fit group "
                >
                  Create Account
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
              {loading && (
                <div className="text-sm text-gray-500">Loading providers…</div>
              )}
              {!loading && providers && (
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
                <h2 className="text-2xl font-semibold mb-2">Stay organized</h2>
                <p className="text-gray-600">
                  Track tasks, collaborate with your team, and ship faster with
                  Task Mate.
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-gray-700 text-sm list-disc pl-6">
                <li>Create and assign tasks</li>
                <li>Real-time collaboration</li>
                <li>Project dashboards and insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
