'use client'

import Panel from '@/app/components/Panel'
import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import './layout.css'
import { TaskPaneType } from '@/app/lib/interface'
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/navigation'

function ProjectLayout({ children }: { children: ReactNode }) {

    const pathname = usePathname();
    const searchParams = useSearchParams()
    const projectdId = searchParams.get("pid")
    // const [pathname, setPathName] = useState<string>(window.location.href)
    const [taskPanes, setTaskPanes] = useState<TaskPaneType[]>([])

    // const [pOwner, setPOwner] = useState<string>('')

    // const getProductOwner = () => {
    //     fetch('/api/getUser', {
    //         method: "POST",
    //         body: JSON.stringify({
    //             id: localStorage.getItem('userID')
    //         }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             setPOwner(data)
    //         })
    //         .catch(e => console.log(e))
    // }


    useEffect(() => {
        fetch(`http://localhost:3000/api/task?pid=${projectdId}`)
            .then(async response => {
                const data = await response.json();

                if (response.ok) {
                    setTaskPanes(data)
                    // console.log(data)
                }
            })

        console.log(searchParams)
        // setPathName(window.location.href)
    }, [])

    return (
        <div className='flex flex-col h-screen'>
            <div className='flex justify-between'>
                <span className='font-bold'>{ }</span>
                {/* <p>Project Owner: {pOwner}</p> */}
            </div>
            <div className='flex gap-4 bg-slate-50 p-2 rounded-lg shadow-sm'>
                <Link href={`/project/AddTasks?pid=${projectdId}`}> <p className={classNames({
                    'rounded-full active:bg-slate-200 py-2 px-4 text-sm hover:bg-gray-100 duration-150 cursor-pointer': true,
                    'bg-slate-200': pathname.includes('AddTasks')
                })}>Add Task</p></Link>
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
            {/* 
            <div className='flex flex-col items-center'>
                <div className='w-full max-w-[1600px] mx-0 flex-grow rounded-lg px-0'>

                    <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 p-4 gap-5'>
                        
                        {taskPanes.map((taskPane: TaskPaneType, index: any) => (
                            <TaskPane
                                key={taskPane.id}
                                {...taskPane}
                            />
                        ))}

                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ProjectLayout