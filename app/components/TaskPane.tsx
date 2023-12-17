import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { TaskPaneType } from '@/app/lib/interface'
import { SubTaskType } from '@/app/lib/interface'
import { Button, Card, Dialog, DropdownMenu, Flex, IconButton, Text, TextArea, TextField } from '@radix-ui/themes'
import { FaCheck } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { nanoid } from 'nanoid'
import { MdEdit } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import AsyncSelect from 'react-select/async'
import { OptionsOrGroups, GroupBase } from 'react-select'
import { IoClose } from "react-icons/io5";
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'
import { MdDescription } from "react-icons/md";
// import MDEditor from '@uiw/react-md-editor';



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

    useEffect(() => {
        // console.log(taskPane)
        fetch('/api/addTask', {
            method: 'POST',
            body: JSON.stringify(taskPane),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                const data = await response.json()
                console.log(data)
            })
    }, [taskPane, subTasks])

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
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const dialogRef = useRef<any>()

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
        dialogRef.current.click()
    }

    function handleUserSelectChange() {

    }

    async function loadOptions(query: string, callback: (options: OptionsOrGroups<any, GroupBase<any>>) => void): Promise<OptionsOrGroups<any, GroupBase<any>>> {

        const tempProjectId = '1234abcd'
        const tempUserId = 'user1234'
        const response = await fetch(`api/getUsers`, {
            method: "POST",
            body: JSON.stringify({
                projectId: tempProjectId,
                userId: tempUserId
            })
        })

        const data: [] = await response.json()
        return Promise.resolve(data as OptionsOrGroups<any, GroupBase<any>>)
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
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button ref={dialogRef} className='!hidden'></Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title className='flex space-x-4'>
                        <MdAddToQueue className='text-2xl' />
                        <h1>{subTask.title}</h1>
                    </Dialog.Title>
                    <div>
                        Description:
                        <TextArea>
                        </TextArea>
                    </div>
                    <div>
                        Assign members:
                        <AsyncSelect
                            isMulti
                            value={selectedUsers}
                            onChange={handleUserSelectChange}
                            placeholder='type email'
                            loadOptions={loadOptions}
                        />
                        {/* <AsyncSelect isMulti ></AsyncSelect> */}
                        {/* <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <TextField.Input></TextField.Input>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item onClick={editSubTaskTitle} className='z-10 !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>User</DropdownMenu.Item>
                                <DropdownMenu.Item onClick={editSubTaskTitle} className='z-10 !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>User</DropdownMenu.Item>
                                <DropdownMenu.Item onClick={editSubTaskTitle} className='z-10 !m-1  hover:!bg-neutral-600 hover:!text-white !text-black'>User</DropdownMenu.Item>

                            </DropdownMenu.Content>
                        </DropdownMenu.Root> */}
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )

}

export default TaskPane