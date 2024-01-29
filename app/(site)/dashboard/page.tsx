'use client'

import React from 'react'
import './dashboard.css'
import Link from 'next/link'
import Card from '@/app/components/card'

function Dashboard() {

    return (
        <div className='flex flex-col gap-10  h-screen'>
            <div className='flex justify-between'>
                <h1 className='text-5xl font-bold '>Dashboard</h1>
            </div>
            <div className='grid grid-cols-2  gap-7 w-full h-fit max-w-[2000px] mx-auto'>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]  relative overflow-hidden bg-slate-300 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>Create a new project</h1>
                    </div>
                </Link>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]   relative overflow-hidden bg-slate-100 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>More</h1>
                    </div>
                </Link>
                <Link href={'projects'} className='col-span-2'>
                    <div className='h-[400px] w-full  relative overflow-hidden bg-slate-200 rounded-lg shadow-lg flex flex-col justify-end items-end p-4 hover:shadow-slate-200  hover:outline-dark2 outline-1 duration-150 ease-in-out'>
                        <h1 className='font-semibold bg-white px-10 py-3 rounded-full text-gray-800 hover:bg-dark2 hover:text-slate-100 cursor-pointer z-10'>Projects</h1>
                    </div>
                </Link>
                <Card />
            </div>
        </div>
    )
}

export default Dashboard