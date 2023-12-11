'use client'

import React, { useEffect } from 'react'
import { FaGithub } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import TextBox from '@/app/components/TextBox';
import Link from 'next/link';

const Page = () => {

    const router = useRouter()

    // const login = async () => {
    //     fetch('api/login', { method: 'post' })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data) {
    //                 router.push(data.url); // Redirect to the authentication URL
    //             }
    //             else {
    //                 console.log(data.error)
    //             }
    //         })
    //         .catch(e => console.log(e))
    // }
    let redirectUrl = "http://location:3000";

    useEffect(() => {
        const url = new URL(location.href);
        redirectUrl = url.searchParams.get("callbackUrl")!;
    });

    const handleLogin = () => {
        signIn()
    }

    return (
        <>
            <div className='relative w-full h-full flex flex-col justify-center items-center p-10'>
                <h1 className='text-5xl font-bold tracking-wide py-10'>Login</h1>
                <div className='flex flex-col gap-2'>
                    <TextBox placeholder='Email'></TextBox>
                    <TextBox placeholder='Password'></TextBox>
                    <div className='flex items-center space-x-4'>
                        <div className='flex-grow h-[1px] bg-black'></div>
                        <p>or</p>
                        <div className='flex-grow h-[1px] bg-black'></div>
                    </div>
                    <div className='group flex items-center justify-start gap-6 bg-stone-800 text-stone-50 border-black border-2 shadow-lg p-5 px-16 hover:bg-dark2 active:scale-105 duration-150 text-xl cursor-pointer' onClick={() => {
                        signIn("github", {
                            callbackUrl: redirectUrl,
                        });
                    }}>
                        <FaGithub className='scale-150  group-hover:text-white duration-150 ' />
                        <label htmlFor="google" className='group-hover:text-white duration-150'>Continue with Githhub</label>
                    </div>
                    <p>New to Task Mate? <Link href={'/signup'} className='hover:underline'>Create Account</Link></p>
                </div>
            </div>
        </>
    )
}

export default Page

// <div className='w-full h-full flex flex-col gap-4 justify-center items-center text-stone-800 px-4 md:px-10 md:py-24 lg:px-24'>
//     <div className="flex flex-row gap-4 w-full  bg-transparent">
//         <div className="title w-full py-2 text-center text-xl md:text-4xl font-semibold">Log into your account</div>
//     </div>

//     <form action="" className='w-full flex flex-col gap-6 justify-center items-center'>
//         <label htmlFor="email"></label>
//         <input type="text" name="email" id="email" placeholder='amanapps.inc@gmail.com'
//             className='w-[80%] py-3 border-stone-500 outline-1 rounded-sm bg-stone-50'
//         />
//         <label htmlFor="password"></label>
//         <input type="password" name="password" id="password" placeholder='your password'
//             className='w-[80%] py-3 border-stone-500 outline-1 rounded-sm  bg-stone-50'
//         />

//         <div className="sumbit py-3 flex w-full justify-center text-stone-400" >
//             <button className="w-[60%] bg-stone-800 py-4 px-2">login</button>
//         </div>

//         <div className="providers relative flex flex-row gap-4 border-t-8 w-full py-4 ">
//             <p className="p absolute top-0 left-1/2 -translate-x-1/2 py-4 px-1 bg-white">or</p>
//             <button className="google w-[60%] py-4 px-2 ">signIn with  </button>
//         </div>

//     </form>
// </div>
