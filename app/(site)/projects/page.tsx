'use client'

import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'
import constants from '../data/constants'


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
        <div className='grid grid-cols-3  grid-rows-2 justify-center h-screen gap-8'>

            {
                projects.map((project: any, index: number) => (
                    <Link href={'/project/[id]'} as={`/project/${project.name}`} key={index}>
                        <div className='relative  overflow-hidden bg-[#a6a1b1] w-full h-fit max-w-[500px] p-20 flex flex-col rounded-3xl shadow-sm bg-opacity-10 hover:scale-105 duration-200 hover:bg-white hover:shadow-2xl cursor-pointer active:scale-100'>
                            <h1 className='font-bold tracking-wide text-2xl py-2'>{project.name}</h1>
                            <p className='text-sm'>
                                {project.description}
                            </p>
                            <div className='bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8'>
                                {project.members_count}/25 Members
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Projects 