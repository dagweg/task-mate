'use client'

import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Card from '@/app/components/card'


function Dashboard() {


        // request only if there is access token, else get the locally stored data from the first login 
        const {data:session} = useSession()
        const user  = session?.user
        console.log("heeyoooooo this is athe session",user)


    return (
        <div className='p-20 flex flex-col gap-10  h-screen'>
            <div className='flex justify-between'>
                <h1 className='text-5xl font-bold '>Dashboard</h1>
                <p>Logged in as : <span className='font-semibold'>{user?.name ?? "signup"}</span></p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-1  gap-7 w-full h-fit max-w-[2000px] mx-auto'>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]  relative overflow-hidden bg-slate-900 rounded-lg shadow-lg flex flex-col justify-end items-end p-4  hover:outline hover:outline-dark2 outline-1 duration-50 ease-in-out'>
                        <h1 className='font-semibold bg-slate-300 px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer active:'>Create a new project</h1>
                    </div>
                </Link>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]   relative overflow-hidden bg-slate-100 rounded-lg shadow-lg flex flex-col justify-end items-end p-4  hover:outline hover:outline-dark2 outline-1 duration-50 ease-in-out'>
                        <h1 className='font-semibold bg-slate-300 px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer active:'>More</h1>
                    </div>
                </Link>
                <Link href={'projects/add'} className='col-span-2'>
                    <div className='h-[400px] w-full  relative overflow-hidden bg-slate-100 rounded-lg shadow-lg flex flex-col justify-end items-end p-4  hover:outline hover:outline-dark2 outline-1 duration-50 ease-in-out'>
                        <h1 className='font-semibold bg-slate-300 px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer active:'>Team statistics</h1>
                    </div>
                </Link>
                <Card/>
            </div>
        </div>
    )
}

export default Dashboard