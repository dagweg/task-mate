import React, { ReactNode } from 'react'
import Link from 'next/link'
import ButtonRound from '@/app/components/ButtonRound'
// import AddProjectDropdownButton from '@/app/components/createProjectButton'

function ProjectsLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-20 flex flex-col gap-10 h-fit '>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-5xl font-bold '>Projects</h1>
                {/* <AddProjectDropdownButton/> */}
                <Link href={'/projects/add'}><ButtonRound label={<><i className='fa-solid fa-plus mx-4'></i>AddProject</>} /></Link>
            </div>
            {children}
        </div>
    )
}

export default ProjectsLayout