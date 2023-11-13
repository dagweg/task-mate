import React, { ReactNode } from 'react'
import Link from 'next/link'

function ProjectsLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-20 flex flex-col gap-10 h-screen'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-5xl font-bold '>Projects</h1>
                <Link href={'/projects/add'}><div className='bg-dark2 text-white p-4 rounded-lg hover:bg-dark1 cursor-pointer active:scale-105 duration-150 ease-in-out'><i className='fa-solid fa-plus mx-4'></i>Add Project</div></Link>
            </div>
            {children}
        </div>
    )
}

export default ProjectsLayout