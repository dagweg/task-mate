'use client'

import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient'
import constants from '../../data/constants'
import { shortener } from '@/app/lib/utils'


interface Project {
    name: string,
    description: string,
    members_count: number
}

function Projects() {

    const PROJECT_TABLE = 'projects'
    const [projects, setProjects] = useState<ReactElement[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            fetch('api/getProjects', { method: "POST" })
                .then(response => response.json())
                .then(data => {
                    setProjects(prev => data)
                })
                .catch(error => {
                    throw Error(error)
                })
        }

        fetchProjects()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center h-screen gap-8'>

            {
                projects.map((project: any, index: number) => (
                    <Link href={'/project/[id]'} as={`/project/${project.name}`} key={index}>
                        <div className='flex flex-col justify-around cols-span-1  overflow-hidden bg-[#a6a1b1] w-full h-full max-w-[500px] p-7 rounded-[10px] shadow-sm bg-opacity-10 hover:scale-[101%] duration-200 hover:bg-white border-2 hover:border-red-200 hover:shadow-2xl cursor-pointer active:scale-100'>
                            <h1 className='font-bold tracking-wide text-2xl py-2'>{shortener(project.name, 22)}</h1>
                            <p className='text-sm text-justify '>
                                {shortener(project.description, 200)}
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

export default Projects 