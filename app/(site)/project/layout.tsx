'use client'
import React, { ReactNode } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import './layout.css'
import Link from 'next/link';
import classNames from 'classnames';

function ProjectLayout({ children }: { children: ReactNode }) {

    const pathname = usePathname();
    const searchParams = useSearchParams()
    const projectdId = searchParams.get("pid")

    return (
        <div className='flex flex-col h-screen'>
            <div className='flex gap-4 bg-slate-50 p-2 rounded-lg shadow-sm'>
                {
                    <Link href={`/project/AddTasks?pid=${projectdId}`}> <p className={classNames({
                        'rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer': true,
                        'bg-slate-200': pathname.includes('AddTasks')
                    })}>Add Task</p></Link>
                }
                <Link href={`/project/ViewTasks?pid=${projectdId}`}><p className={classNames({
                    'rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer': true,
                    'bg-slate-200': pathname.includes('ViewTasks')
                })}>View Tasks</p></Link>
                <Link href={`./members?pid=${projectdId}`}><p className={classNames({
                    'rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer': true,
                    'bg-slate-200': pathname.includes('members')
                })}>Members</p></Link>
            </div>
            {children}
        </div>
    )
}

export default ProjectLayout