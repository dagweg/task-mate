'use client'

import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import { cn } from '@/app/lib/utils'
// import { shortener } from '@/app/lib/utils'


interface Project {
    name: string,
    description: string,
    members_count: number
}

function OtherProjects() {

    const [projects, setProjects] = useState<ReactElement[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            // const userId = localStorage.getItem('userId')
            fetch(`http://localhost:3000/api/getProjectsOther`, {
                method: "POST",
                body: JSON.stringify({
                    uid: localStorage.getItem('userId')
                })
            })
                .then(response => response.json())
                .then(data => {
                    setProjects(prev => data)
                    console.log(data)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        fetchProjects()
    }, [])

    return (
        <div className={cn(projects.length !== 0 && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', ' justify-center  w-full  gap-8')}>
            {
                projects.length === 0 ?
                    <div className='w-full h-full  flex flex-col my-60 items-center'>
                        <div className='bg-gray-100 text-black w-fit h-fit p-3 px-10 rounded-full'>
                            Nothing to show here. Get started by joining a project...
                        </div>
                    </div>
                    :
                    [...projects].map((project: any, index: number) => (
                        <Link href={'/project/[id]'} as={`/project/project?pname=${project.title}&pid=${project.id}`} key={index}>
                            <div className='flex flex-col justify-around cols-span-1  overflow-hidden bg-[#a6a1b1] w-full h-fit max-w-[500px] p-7 rounded-[10px] shadow-sm bg-opacity-10 hover:scale-[101%] duration-200 hover:bg-white border-2 hover:border-red-200 hover:shadow-2xl cursor-pointer active:scale-100'>
                                <h1 className='font-bold tracking-wide text-2xl py-2'>{project.title}</h1>
                                <p className='text-sm text-justify '>
                                    {project.description}
                                </p>
                                <div className='bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8'>
                                    {project.members_count}/25 Members
                                </div>
                            </div>
                        </Link>
                    ))
            }
            {/* <Link href={'/project/[id]'} as={`/project/test-project`}>
                <div className='flex flex-col justify-around cols-span-1  overflow-hidden bg-[#a6a1b1] w-full h-full max-w-[500px] p-7 rounded-[10px] shadow-sm bg-opacity-10 hover:scale-[101%] duration-200 hover:bg-white hover:shadow-2xl cursor-pointer active:scale-100'>
                    <h1 className='font-bold tracking-wide text-2xl py-2'>{shortener('test-project', 22)}</h1>
                    <p className='text-sm text-justify '>
                        {shortener('this is the project descritption', 200)}
                    </p>
                    <div className='bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8'>
                        25/25 Members
                    </div>
                </div>
            </Link> */}
        </div>
    )
}

export default OtherProjects 