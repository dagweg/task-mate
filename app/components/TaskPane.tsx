'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import TextBox from './TextBox'
import { MdAddToQueue, MdAssignmentAdd, MdAddBox, MdDone, MdAdd } from "react-icons/md";
import './TaskPane.css'
import { RiDeleteBinFill } from "react-icons/ri";
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import { Button, DropdownMenu, TextField } from '@radix-ui/themes';
import { cn } from '../lib/utils';
import { IoMdMore } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";
import { CiEdit } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
// import Button from './Button';

interface SubTask {
    label: string,
    id: number,
    editMode: boolean,
    opened: boolean
}
interface Props {
    taskId: any,
    removeTaskPaneCallback: any
}


function TaskPane({ taskId, removeTaskPaneCallback }: Props) {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [subTasks, setSubTasks] = useState<SubTask[]>([]);
    const [subTaskTitle, setSubTaskTitle] = useState<string>('');
    const [taskPaneCreated, setTaskPaneCreated] = useState<Boolean>(false);

    let userList = useRef<HTMLDivElement>(null);

    const addSubTaskFromMenu = () => {
        const emptySubTask: SubTask = {
            label: '',
            id: 0,
            editMode: true,
            opened: false
        }
        setSubTasks((prev: SubTask[]) => [...prev, emptySubTask])
    }

    const setSubTaskEditMode = (subTaskId: number, editMode: boolean) => {
        const modifiedSubTasks: SubTask[] = subTasks.map(subTask => {
            if (subTask.id == subTaskId) {
                return {
                    ...subTask,
                    label: subTaskTitle,
                    editMode: editMode,
                }
            }
            return subTask
        })
        setSubTasks(modifiedSubTasks)
    }

    const addSubTask = (subTaskId: number) => {
        setSubTaskEditMode(subTaskId, false);
        const newSubTask: SubTask = {
            label: subTaskTitle,
            id: subTaskId,
            editMode: false,
            opened: false
        }
        setSubTasks(prev => [
            ...prev,
            newSubTask
        ])
    }

    const titleTextBoxOnBlur = () => {
        if (taskTitle == '' && subTasks.length == 0) {
            removeTaskPaneCallback(taskId)
        }

        setTaskPaneCreated(true);
    }



    useEffect(() => {

    })



    return (
        <div className='task-pane' key={taskId}>
            {/* <div className='delete-task absolute cursor-pointer hidden top-0 right-0 p-1 hover:bg-gray-200 rounded-full' onClick={() => removeTaskPaneCallback(taskId)}>
                <RiDeleteBinFill className='' />
            </div> */}
            <div className={cn('flex ', taskPaneCreated ? '' : 'justify-center')}>
                {
                    taskPaneCreated ?
                        <>
                            <div className='flex justify-between items-center w-full'>
                                <h1 className='text-xl font-semibold uppercase'>{taskTitle}</h1>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Button className='!bg-transparent hover:!bg-gray-200' >
                                            <TfiMoreAlt className='text-black text-xl' />
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item shortcut="⌘ E" onClick={() => setTaskPaneCreated(false)}>Edit</DropdownMenu.Item>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item shortcut="⌘ A" onClick={() => addSubTaskFromMenu()}>Add Subtask</DropdownMenu.Item>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item shortcut="⌘ ⌫" color="red" onClick={() => removeTaskPaneCallback(taskId)}>
                                            Delete
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </div>
                        </>
                        :
                        <>
                            <TextBox placeholder='Task Title' className='h-8 border-t-0 border-r-0 border-l-0 !border-b-2   focus:bg-slate-200 flex-grow' onChange={(e: any) => setTaskTitle(e.target.value)} onBlur={titleTextBoxOnBlur}></TextBox>
                            <Button className='!bg-gray-400 hover:!bg-gray-600' onClick={() => setTaskPaneCreated(true)}>
                                <MdDone />Done
                            </Button>
                        </>
                }
            </div>
            <hr className='h-[2px] bg-black my-2 bg-opacity-50' />
            <div className='space-y-2 '>
                {subTasks.map((subTask: SubTask, index: number) => (
                    <>
                        {
                            subTask.editMode == true ?
                                < div key={index} className='flex w-full ' >
                                    <TextField.Root className='w-full'>
                                        <TextField.Slot>
                                            <MdAddToQueue></MdAddToQueue>
                                        </TextField.Slot>
                                        <TextField.Input className='!p-2 !outline-2 !outline-gray-700' color='gray'>
                                        </TextField.Input>
                                        <TextField.Slot>
                                            <div className='p-1 rounded-lg hover:bg-gray-200 cursor-pointer' onClick={() => setSubTaskEditMode(index, false)}>Add</div>
                                        </TextField.Slot>
                                    </TextField.Root>
                                </div>
                                :
                                < div key={index} className='flex justify-between items-center bg-white border-[1px] text-neutral-800 font-md tracking-wide p-2 rounded-xl' >
                                    <h3>{subTask.label}</h3>
                                    <div className='p-[0.3rem] bg-gray-200 hover:bg-gray-600 hover:text-white duration-75 rounded-full' onClick={() => setSubTaskEditMode(index, true)}>
                                        <FaRegEdit className='text-xl ' />
                                    </div>
                                </div>
                        }
                    </>
                ))}
                <div className='flex justify-end '>
                    <Button className='!mt-2 !bg-transparent !text-black hover:!text-white hover:!bg-gray-800 duration-75 ease-out' onClick={addSubTaskFromMenu}>
                        <MdAdd></MdAdd>
                        Add a subtask
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default TaskPane