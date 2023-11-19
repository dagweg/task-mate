'use client'

import Panel from '@/app/components/Panel'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import TopNav from '@/app/components/TopNav';

function ProjectLayout({ children }: { children: ReactNode }) {

    const pathname = usePathname();

    let paths = pathname.split('/')
    let path = decodeURIComponent(paths[paths.length - 1])



    return (
        <div className='p-20 flex flex-col h-screen'>
            <div className='flex justify-between items-center'>
                <div className='text-2xl'>Project: <span className='font-bold'>{path}</span></div>
                <Panel text='Users online: 7' />
            </div>
            <div className='bg-gray-100 w-full flex-grow rounded-lg px-2'>
                <TopNav links={[
                    { label: "Add Task", link: "#" },
                    { label: "Generate Task Report", link: "#" }
                ]}></TopNav>
                <div >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProjectLayout