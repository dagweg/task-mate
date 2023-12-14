import React from 'react'
import { useState } from 'react'
import { TaskPaneType } from '@/app/lib/interface'
import { SubTaskType } from '@/app/lib/interface'
import { Button, Card, Dialog, DropdownMenu, Flex, IconButton, Text, TextField } from '@radix-ui/themes'
import { FaCheck } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { nanoid } from 'nanoid'
import { MdEdit } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import MDEditor from '@uiw/react-md-editor';
import { MdDescription } from "react-icons/md";

function TaskPane(props: TaskPaneType) {

    const [taskPane, setTaskPane] = useState<TaskPaneType>(props)
    const [subTasks, setSubTasks] = useState<SubTaskType[]>(props.subtasks)
    const [tpTitle, setTpTitle] = useState<string>(props.title)

    function saveTaskTitle() {
        const newTaskPane: TaskPaneType = {
            ...taskPane,
            title: tpTitle,
            isEditMode: false
        }

        setTaskPane(prev => newTaskPane)
    }

    function editTaskTitle() {
        const newSubTask: TaskPaneType = {
            ...taskPane,
            isEditMode: true
        }
        setTaskPane(prev => newSubTask)
    }

    function deleteTaskPane() {
        props.removeTaskPaneCallback(taskPane.id)
    }

    function addSubTask() {
        const newSubTask: SubTaskType = {
            id: nanoid(),
            description: '',
            isComplete: false,
            isEditMode: true,
            isFirstTime: true,
            isOpen: false, // is the dialog open
            title: '',
            removeSubTaskCallback: (subTaskId: string) => {
                setSubTasks(prev => prev.filter(subTask => subTask.id != subTaskId))
            }
        }

        setSubTasks(prev => [...prev, newSubTask])
    }

    return (
        <div className='task-pane'>
            <Card className='!bg-gray-200  h-fit !border-2 duration-75 hover:!border-red-200'>
                {
                    taskPane.isEditMode ?
                        <>
                            <TextField.Root className='flex items-center'>
                                <TextField.Input placeholder='Task Title' className='!p-2' value={tpTitle} onChange={e => setTpTitle(e.target.value)}></TextField.Input>
                                <TextField.Slot>
                                    <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-600' onClick={saveTaskTitle}>
                                        <FaCheck></FaCheck>
                                    </IconButton>
                                </TextField.Slot>
                            </TextField.Root>
                        </>
                        :
                        <>
                            <div className='flex items-center justify-between' >
                                <h1 className='uppercase text-xl tracking-wider font-semibold'>{taskPane.title}</h1>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-300 !text-xl !text-black'><IoIosMore /></IconButton>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content className='min-w-[10rem]'>
                                        <DropdownMenu.Item onClick={editTaskTitle} className=' !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>Edit Title</DropdownMenu.Item>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item onClick={deleteTaskPane} className=' !m-1  hover:!bg-red-500 hover:!text-white !text-black'>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </div>

                            <div className='sub-task-container space-y-[10px] py-2'>
                                {
                                    subTasks.map(subTask => (
                                        <SubTask key={subTask.id} {...subTask} />
                                    ))
                                }
                            </div>

                            <div className='flex justify-end'>
                                <IconButton onClick={addSubTask} className=' !m-1 !bg-gray-400 hover:!bg-neutral-600 !w-fit !px-4 gap-2'><IoAdd />Add Subtask</IconButton>
                            </div>
                        </>
                }

            </Card>
        </div>
    )
}


function SubTask(props: SubTaskType) {

    const [subTask, setSubTask] = useState<SubTaskType>(props)
    const [stTitle, setStTitle] = useState<string>(props.title)
    const [mdText, setMdText] = useState<any>('**Write something here**')

    function saveSubTaskTitle() {
        const newSubTask: SubTaskType = {
            ...subTask,
            title: stTitle,
            isEditMode: false
        }

        setSubTask(prev => newSubTask)
    }

    function editSubTaskTitle() {
        const newSubTask: SubTaskType = {
            ...subTask,
            isEditMode: true
        }
        setSubTask(prev => newSubTask)
    }
    function deleteSubTask() {
        props.removeSubTaskCallback(subTask.id)
    }

    function openSubTaskDialog(bool: boolean) {
        const opened: SubTaskType = {
            ...subTask,
            isOpen: bool
        }
        setSubTask(prev => opened)
    }

    return (
        <>
            {
                subTask.isEditMode ?
                    <>
                        <TextField.Root className='flex items-center'>
                            <TextField.Input placeholder='Subtask' className='!p-2' value={stTitle} onChange={e => setStTitle(e.target.value)}></TextField.Input>
                            <TextField.Slot>
                                <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-600' onClick={saveSubTaskTitle}>
                                    <FaCheck></FaCheck>
                                </IconButton>
                            </TextField.Slot>
                        </TextField.Root>
                    </>
                    :
                    <>
                        <div className='flex items-center justify-between bg-white hover:bg-slate-100 rounded-xl px-2 '>
                            <div onClick={() => openSubTaskDialog(true)} className=' flex-grow py-2 '>
                                <h1 className='uppercase text-sm px-2 tracking-wider font-semibold'>{subTask.title}</h1>
                            </div>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-300 !text-xl !text-black'><MdEdit /></IconButton>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className='min-w-[10rem]'>
                                    <DropdownMenu.Item onClick={editSubTaskTitle} className='z-10 !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>Edit Title</DropdownMenu.Item>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item onClick={deleteSubTask} className=' !m-1  hover:!bg-red-500 hover:!text-white !text-black'>Delete</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                    </>

            }
            {

                subTask.isOpen ?
                    <div className='fixed inset-0 w-full h-full bg-black backdrop-blur-[1px] bg-opacity-75 z-[100] flex justify-center items-center'>
                        <div className='bg-slate-500 bg-opacity-75 rounded-lg w-[700px] h-[800px] z-[105] text-white p-5'>
                            <div className='flex items-center  gap-2 justify-between'>
                                <div className='flex  items-center  gap-2'>
                                    <MdAddToQueue className='text-2xl' />
                                    <h1 className='text-2xl font-semibold capitalize'>{subTask.title}</h1>
                                </div>
                                <IoClose onClick={() => openSubTaskDialog(false)} className='text-2xl hover:bg-slate-400 rounded-full p-1 active:scale-105' />
                            </div>
                            <div className='py-10'>
                                <div className='flex py-4'>
                                    <MdDescription onClick={() => openSubTaskDialog(false)} className='text-2xl hover:bg-slate-400 rounded-full p-1 active:scale-105' />
                                    <h1>Description:</h1>
                                </div>
                                <MDEditor className='!h-[400px]' value={mdText} onChange={setMdText} />
                            </div>
                        </div>

                    </div>
                    :
                    <div></div>
            }

        </>
    )

}

export default TaskPane