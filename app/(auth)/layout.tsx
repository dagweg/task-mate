import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="w-screen h-screen">
      <section className="w-full h-full flex flex-col gap-3 items-center justify-center">
        <fieldset className="border border-1 border-gray-300 p-5 rounded-md">
          <legend className="text-2xl font-bold">Task Mate</legend>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <FaGoogle className="text-xl" />
              Sign in with Google<div></div>
            </button>
            <button
              type="button"
              className="text-white w-full  bg-black hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-[gray]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <FaGithub className="text-xl" />
              Sign in with Github<div></div>
            </button>
          </div>
        </fieldset>
      </section>
    </body>
  );
}
