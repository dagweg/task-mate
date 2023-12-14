'use client'

import Panel from '@/app/components/Panel'
import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import TopNav from '@/app/components/TopNav';
import { MdAddBox } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import './layout.css'
import { FaUsers } from "react-icons/fa";
import { nanoid } from 'nanoid';
import { AiOutlineClear } from "react-icons/ai";
import TaskPane from '@/app/components/TaskPane';
import { TaskPaneType } from '@/app/lib/interface'
import { SubTaskType } from '@/app/lib/interface'


function ProjectLayout({ children }: { children: ReactNode }) {

    const pathname = usePathname();

    let paths = pathname.split('/')
    let path = decodeURIComponent(paths[paths.length - 1])

    const [taskPanes, setTaskPanes] = useState<TaskPaneType[]>([])

    const addTask = () => {
        const newTask: TaskPaneType = {
            id: nanoid(),
            title: '',
            subtasks: [],
            isEditMode: true,
            isFirstTime: true,
            removeTaskPaneCallback: (taskPaneId: string) => {
                const newTaskPanes = taskPanes.filter(taskPane => taskPane.id != taskPaneId)
                setTaskPanes(prev => newTaskPanes)
            }
        }

        console.log(taskPanes)

        setTaskPanes(prev => [...prev, newTask])
    }

    const removeTaskPane = (k: string) => {
        const newTaskPanes = taskPanes.filter(taskPane => {
            return taskPane.id !== k
        })
        setTaskPanes(prev => newTaskPanes)
    }

    const clearTasks = () => {
        setTaskPanes([])
    }

    return (
        <div className='flex flex-col h-screen'>
            <span className='font-bold'>{path}</span>
            <div className='flex items-center justify-between'>
                <TopNav links={[
                    { label: <MdAddBox />, link: "#", onClickCallback: () => addTask(), className: 'add-new-task relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit ' },
                    { label: <IoStatsChart />, link: "#", className: 'generate-task-report  relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit ' }
                ]}
                    className='rounded-sm flex !gap-0 !space-x-0 h-full '></TopNav>

                <div className='!bg-slate-200 flex items-center'>
                    <div className='bg-gray-100 h-full p-5 hover:bg-neutral-200 duration-75 ease-in-out cursor-pointer' onClick={clearTasks}>
                        <AiOutlineClear className='h-full text-xl' />
                    </div>
                    <div className='users-online'>
                        <Panel text={
                            <div className='flex gap-4 h-full items-center '><FaUsers className='scale-[2]' />1000</div>
                        }
                            className='!relative rounded-none !bg-transparent  !text-black h-full ' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='w-full max-w-[1600px] mx-0 flex-grow rounded-lg px-0'>

                    <div className=' grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 p-4 gap-5'>
                        {/* {children}? */}
                        {taskPanes.map((taskPane: TaskPaneType, index: any) => (
                            <TaskPane
                                key={taskPane.id}
                                {...taskPane}
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectLayout