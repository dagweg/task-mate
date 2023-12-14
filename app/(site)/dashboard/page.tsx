'use client'

import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Card from '@/app/components/card'

import Image from 'next/image'

function Dashboard() {


    // request only if there is access token, else get the locally stored data from the first login 
    const { data: session } = useSession()
    const user = session?.user
    console.log("heeyoooooo this is athe session", user)


    return (
        <div className='flex flex-col gap-10  h-screen'>
            <div className='flex justify-between'>
                <h1 className='text-5xl font-bold '>Dashboard</h1>
            </div>
            <div className='grid grid-cols-2  gap-7 w-full h-fit max-w-[2000px] mx-auto'>
                <Link href={'projects/add'} className='col-span-1'>

                    <div className='h-[400px]  relative overflow-hidden bg-slate-300 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>Create a new project</h1>
                        {/* <Image src={'https://i.imgur.com/fyS86NN.jpg'} alt='project' objectFit='cover' layout='fill' className='z-0'></Image> */}
                    </div>
                </Link>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]   relative overflow-hidden bg-slate-100 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>More</h1>
                        {/* <Image src={'https://i.imgur.com/cZSG4xG.jpg'} alt='project' objectFit='cover' layout='fill'></Image> */}
                    </div>
                </Link>
                <Link href={'projects'} className='col-span-2'>
                    <div className='h-[400px] w-full  relative overflow-hidden bg-slate-200 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>Projects</h1>
                        {/* <Image src={'https://i.imgur.com/fcnUz72.jpg'} alt='project' objectFit='cover' layout='fill' className='z-0'></Image> */}
                    </div>
                </Link>
                <Card />
            </div>
        </div>
    )
}

export default Dashboard