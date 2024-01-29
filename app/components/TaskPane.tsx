'use client'

import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { TaskPaneType } from '@/app/lib/interface'
import { SubTaskType } from '@/app/lib/interface'
import { Button, Card, Dialog, DropdownMenu, IconButton, TextArea, TextField } from '@radix-ui/themes'
import { FaCheck } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { nanoid } from 'nanoid'
import { MdEdit, MdMoreHoriz } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import { useSearchParams } from 'next/navigation'
import { User } from '@prisma/client'


function TaskPane(props: TaskPaneType) {

    const [project, setProject] = useState<any>()
    const [taskPane, setTaskPane] = useState<TaskPaneType>(props || [])
    const [subTasks, setSubTasks] = useState<SubTaskType[]>(props.SubTask || [])
    const [tpTitle, setTpTitle] = useState<string>(props.title || '')
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
    const params = useSearchParams()

    const projectId = params.get('pid')

    const dialogRef = useRef<any>()
    const [taskPaneDesc, setTaskPaneDesc] = useState({
        value: props.description as string || '',
        isEditMode: false
    })

    function saveTask() {
        const newTaskPane: TaskPaneType = {
            ...taskPane,
            title: tpTitle,
            description: taskPaneDesc.value,
            SubTask: subTasks,
            isEditMode: false
        }

        setTaskPane(prev => newTaskPane)

        fetch('/api/task/save', {
            method: "POST",
            body: JSON.stringify({
                title: tpTitle,
                taskId: taskPane.id,
                projectId: projectId,
                subTasks: subTasks,
                description: taskPaneDesc.value,
            }),
            headers: {
                "Content-Type": 'application'
            }
        })
            .then(async response => {
                const data = await response.json();
            })

    }
    function editTaskTitle() {
        const newTaskPane: TaskPaneType = {
            ...taskPane,
            isEditMode: true
        }
        setTaskPane(prev => newTaskPane)
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

    function handleTitleBlur() {
        if (tpTitle === '') {
            props.removeTaskPaneCallback(props.id)
        }
    }

    function saveTaskPaneDesc() {
        setTaskPaneDesc({
            ...taskPaneDesc,
            isEditMode: false
        })
        saveTask()
    }

    function editTaskPaneDesc() {
        setTaskPaneDesc({
            ...taskPaneDesc,
            isEditMode: true
        })
    }


    function updateSubTask(id: any, subTaskNew: SubTaskType) {
        const newSubTasks = subTasks.map((subTask: SubTaskType) => {
            if (subTask.id == id) {
                return {
                    ...subTask,
                    ...subTaskNew
                }
            }
            return subTask
        })
        setSubTasks(newSubTasks);
    }

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch('/api/getProject', {
                    method: "POST",
                    body: JSON.stringify({
                        projectId: projectId
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                } else {
                    throw new Error('Failed to fetch project');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProject();
    }, []);

    const handleCheckboxChange = (userId: string) => {
        // Toggle the selection state of the user
        console.log("selected ", userId)
        setSelectedUserIds((prevSelectedUserIds: string[]) => {
            if (selectedUserIds.length == 0) {
                return [userId]
            }
            else if (prevSelectedUserIds.includes(userId)) {
                return prevSelectedUserIds.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUserIds, userId];
            }
        });

        console.log("selected +++++++++ ", selectedUserIds)
    };


    const handleTaskAssignment = async () => {


        fetch('/api/task/assign', {
            method: "POST",
            body: JSON.stringify({
                taskId: taskPane.id,
                projectId: projectId,
                userIds: selectedUserIds
            }),
            headers: {
                "Content-Type": 'application'
            }
        })
            .then(async response => {
                const data = await response.json();
                console.log("yeeeeeeey +++++++++", data)
            })

    };

    return (
        <div className='task-pane' >
            <Card className='!bg-gray-100  h-fit !border-2 duration-75 ' >
                {
                    taskPane.isEditMode ?
                        <>
                            <TextField.Root className='flex items-center'>
                                <TextField.Input placeholder='Task Title' autoFocus onBlur={handleTitleBlur} className='!p-2' value={tpTitle} onChange={e => setTpTitle(e.target.value)} ></TextField.Input>
                                <TextField.Slot>
                                    <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-600' onClick={saveTask}>
                                        <FaCheck></FaCheck>
                                    </IconButton>
                                </TextField.Slot>
                            </TextField.Root>
                        </>
                        :
                        <>
                            <div className='flex items-center justify-between' >
                                <h1 className='text-md tracking-wider font-bold capitalize'>{taskPane.title}</h1>
                                <div className='flex items-center'>
                                    <Button onClick={() => dialogRef.current.click()} className='!cursor-pointer !bg-transparent !text-black hover:!bg-gray-300 '><MdEdit /></Button>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <IconButton className=' !m-1 !bg-transparent hover:!bg-neutral-300 !text-xl !text-black'><IoIosMore /></IconButton>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content className='min-w-[10rem]'>
                                            <DropdownMenu.Item onClick={editTaskTitle} className=' !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>Edit Title</DropdownMenu.Item>
                                            <DropdownMenu.Separator />
                                            <DropdownMenu.Item onClick={deleteTaskPane} className=' !m-1  hover:!bg-red-500 hover:!text-white !text-black'>Delete</DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </div>
                            </div>

                            <div className='sub-task-container space-y-[10px] py-2'>
                                {
                                    subTasks.map(subTask => (
                                        <SubTask key={subTask.id} subTask={subTask} taskId={taskPane.id as string} projectId={projectId as string} />
                                    ))
                                }
                            </div>

                            <div className='flex justify-end'>
                                <IconButton onClick={addSubTask} className=' !m-1 !bg-gray-400 hover:!bg-neutral-600 !w-fit !px-4 gap-2'><IoAdd />Add Subtask</IconButton>
                            </div>
                        </>
                }

            </Card>

            {/** the dialog where information gets edited */}
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button ref={dialogRef} className='!hidden'></Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title className='flex items-center space-x-4'>
                        <MdAddToQueue className='text-2xl' />
                        {
                            taskPane.isEditMode ?
                                <TextField.Root className='flex items-center'>
                                    <TextField.Input placeholder='Task Title' autoFocus onBlur={handleTitleBlur} className='!p-2' value={tpTitle} onChange={e => setTpTitle(e.target.value)} ></TextField.Input>
                                    <TextField.Slot>
                                        <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-600' onClick={saveTask}>
                                            <FaCheck></FaCheck>
                                        </IconButton>
                                    </TextField.Slot>
                                </TextField.Root>
                                :
                                <h1>{tpTitle}</h1>
                        }

                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <div className='hover:bg-gray-100 rounded-lg p-2'><MdMoreHoriz></MdMoreHoriz></div>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item className='!bg-none hover:bg-gray-50' onClick={editTaskTitle}>
                                    Edit
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Dialog.Title>
                    <div>
                        Description:
                        {
                            taskPaneDesc.isEditMode ?
                                <TextArea onChange={e => setTaskPaneDesc({ ...taskPaneDesc, value: e.target.value })} value={taskPaneDesc.value}>
                                </TextArea>
                                :
                                <div className='hover:bg-gray-50 py-3 px-2 cursor-text' onClick={editTaskPaneDesc} >
                                    <p className='font-serif'>{taskPaneDesc.value}</p>
                                </div>
                        }
                    </div>
                    <div>

                        <div className="max-w-md mx-auto my-8 max-h-[30rem] overflow-y-scroll">
                            <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
                            {project && project.users && project.users.map((user: User) => (
                                <div key={user.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={user.id}
                                        value={user.id}
                                        checked={selectedUserIds.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={user.id} className="text-sm">{user.firstName}</label>
                                </div>
                            ))}
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                                onClick={handleTaskAssignment}
                            >
                                Assign Task
                            </button>
                        </div>

                    </div>
                    <Button onClick={() => saveTaskPaneDesc()} className='!cursor-pointer !bg-gray-100 !text-black hover:!bg-dark2 hover:!text-white !my-2 !px-2 !py-4'>Save</Button>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}


function SubTask({ subTask, taskId, projectId }: { subTask: SubTaskType, taskId: string, projectId: string }) {

    const [ssubTask, ssetSubTask] = useState<SubTaskType>(subTask)

    function saveSubTaskTitle() {
        const newSubTask: SubTaskType = {
            ...subTask,
            isEditMode: false
        }
        ssetSubTask(newSubTask);



        fetch(`/api/subtask?sname=${ssubTask.title}&tid=${taskId}&pid=${projectId}&subTaskId=${subTask.id}`)
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    ssetSubTask(data)
                }
                else {
                    console.log("ERROR- saving subtask")
                }
            })


        ssetSubTask(newSubTask)
    }

    function editSubTaskTitle() {
        const newSubTask: SubTaskType = {
            ...subTask,
            isEditMode: true
        }
        ssetSubTask(newSubTask)
    }
    function deleteSubTask() {
        subTask.removeSubTaskCallback(subTask.id)
    }

    return (
        <>
            {
                ssubTask.isEditMode ?
                    <>
                        <TextField.Root className='flex items-center '>
                            <TextField.Input placeholder='Subtask' className='!p-2 ' value={ssubTask.title} onChange={e => ssetSubTask({ ...ssubTask, title: e.target.value })}></TextField.Input>
                            <TextField.Slot>
                                <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-600' onClick={saveSubTaskTitle}>
                                    <FaCheck></FaCheck>
                                </IconButton>
                            </TextField.Slot>
                        </TextField.Root>
                    </>
                    :
                    <>
                        <div className='flex items-center  justify-between bg-white hover:bg-slate-100 border-2 border-transparent hover:border-slate-200 rounded-xl px-2 h-10'>
                            <div className=' flex-grow py-2 '>
                                <h1 className='capitalize text-sm px-2 tracking-wider font-medium'>{ssubTask.title}</h1>
                            </div>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <IconButton className=' !m-1 !bg-transparent hover:!bg-slate-200  !text-xs !text-black'><MdMoreHoriz /></IconButton>
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

        </>
    )

}

export default TaskPane