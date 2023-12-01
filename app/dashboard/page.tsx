'use client'

import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Link from 'next/link'
import constants from '../data/constants'
import { useRouter } from 'next/navigation'


function Dashboard() {

    const [userName, setUserName] = useState('')
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = params.get('access_token') as string

        let storedToken = localStorage.getItem(constants.USER_ACCESS_TOKEN)
        const storedUserData = localStorage.getItem(constants.USER_DATA)


        // request only if there is access token, else get the locally stored data from the first login 
        if (accessToken) {
            localStorage.setItem(constants.USER_ACCESS_TOKEN, JSON.stringify(accessToken)) // store for later use if needed
            fetch('api/getUser/', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken: accessToken
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setUserName(prev => data.full_name)
                        localStorage.setItem(constants.USER_DATA, JSON.stringify(data)) // store user information
                    }
                    else
                        throw new Error('data is null')
                })
                .catch(error => console.log(error))
        }


        // basic first time visit check
        if (!storedUserData) {
            // redirect to login
            router.push('/login')
        }
    }, [])


    return (
        <div className='p-20 flex flex-col gap-10  h-screen'>
            <div className='flex justify-between'>
                <h1 className='text-5xl font-bold '>Dashboard</h1>
                <p>Logged in as : <span className='font-semibold'>{userName}</span></p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-1  gap-7 w-full h-fit max-w-[2000px] mx-auto'>
                <Link href={'projects/add'} className='col-span-1'>
                    <div className='h-[400px]  relative overflow-hidden bg-slate-100 rounded-lg shadow-lg flex flex-col justify-end items-end p-4  hover:outline hover:outline-dark2 outline-1 duration-50 ease-in-out'>
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
            </div>
        </div>
    )
}

export default Dashboard