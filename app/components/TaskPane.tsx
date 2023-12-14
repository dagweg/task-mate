'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import TextBox from './TextBox'
import { MdAddToQueue } from "react-icons/md";
import './TaskPane.css'
import { RiDeleteBinFill } from "react-icons/ri";
import classNames from 'classnames';
import { nanoid } from 'nanoid';

interface SubTask {
    label: string
}
interface Props {
    taskId: any,
    removeTaskPaneCallback: any
}


function TaskPane({ taskId, removeTaskPaneCallback }: Props) {

    const [taskTitle, setTaskTitle] = useState<string>();
    const [subTasks, setSubTasks] = useState<SubTask[]>([]);

    let userList = useRef<HTMLDivElement>(null);

    const addSubTask = () => {
        const newSubTask = {
            label: 'Sub Task'
        }
        setSubTasks((prev: any) => [...prev, newSubTask])
    }

    const subTaskChanged = (e: Event, subTask: SubTask) => {
    }

    useEffect(() => {

    })



    return (
        <div className='task-pane' key={taskId}>
            <div className='delete-task absolute cursor-pointer hidden top-0 right-0 p-1 hover:bg-gray-200 rounded-full' onClick={() => removeTaskPaneCallback(taskId)}>
                <RiDeleteBinFill className='' />
            </div>
            <TextBox placeholder='Task Title' className='h-8 focus:!border-b-2 !rounded-full text-xs' onChange={(e: any) => setTaskTitle(e.target.value)}></TextBox>
            <hr className='h-[2px] bg-black my-2 bg-opacity-50' />
            <div className='space-y-2'>
                {subTasks.map((subTask: SubTask, index: number) => (
                    <TextBox key={index} placeholder='Subtask' className='h-8 focus:!border-b-2 !rounded-full text-xs' onChange={(e: any) => setSubTasks([...subTasks, { ...subTask, label: e.target.value }])}></TextBox>
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={addSubTask} className='flex gap-1 hover:bg-gray-100 p-2 rounded-sm'><MdAddToQueue /> <label className='text-xs'>Add Subtask</label></button>
            </div>
            <div>
                <TextBox placeholder='Assign ' className='h-8 focus:!border-b-2 !rounded-full text-xs' ></TextBox>
                {/* <div ref={userList} className='w-full bg-orange-200 min-h-fit mt-2 max-h-28 overflow-y-scroll'>
                    <p>email</p>
                </div> */}

            </div>
        </div >
    )
}

export default TaskPane