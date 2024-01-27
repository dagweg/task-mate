import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { TaskPaneType } from '@/app/lib/interface'
import { SubTaskType } from '@/app/lib/interface'
import { Button, Card, Dialog, DropdownMenu, Flex, IconButton, Text, TextArea, TextField } from '@radix-ui/themes'
import { FaCheck } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { nanoid } from 'nanoid'
import { MdEdit, MdMore, MdMoreHoriz } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import AsyncSelect from 'react-select/async'
import { OptionsOrGroups, GroupBase } from 'react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoClose } from "react-icons/io5";
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'
import { MdDescription } from "react-icons/md";
import { useParams } from 'next/navigation'
import { title } from 'process'
// import MDEditor from '@uiw/react-md-editor';



function TaskPane(props: TaskPaneType) {

    console.log(props)

    const [taskPane, setTaskPane] = useState<TaskPaneType>(props || [])
    const [subTasks, setSubTasks] = useState<SubTaskType[]>(props.SubTask || [])
    const [tpTitle, setTpTitle] = useState<string>(props.title || '')
    // const [taskPaneDesc, setTaskPaneDesc] = useState<string>(props.description || '');


    const params = useSearchParams()

    const projectName = params.get('pname')
    const projectId = params.get('pid')

    const dialogRef = useRef<any>()
    const [taskPaneDesc, setTaskPaneDesc] = useState({
        value: props.description as string || '',
        isEditMode: false
    })
    const [selectedUsers, setSelectedUsers] = useState<any>([])

    function saveTask() {
        const newTaskPane: TaskPaneType = {
            ...taskPane,
            title: tpTitle,
            description: taskPaneDesc.value,
            SubTask: subTasks,
            isEditMode: false
        }

        setTaskPane(prev => newTaskPane)

        fetch('http://localhost:3000/api/task/save', {
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

        // fetch('http://localhost:3000/api/task', {
        //     method: "POST",
        //     body: JSON.stringify({
        //         title: tpTitle,
        //         projectId: projectId
        //     }),
        //     headers: {
        //         "Content-Type": 'application'
        //     }
        // })
        //     .then(async response => {
        //         const data = await response.json()

        //         console.log(data)
        //         if (response.ok) {
        //             // PROBLEM
        //             // setTaskPane({
        //             //     ...taskPane,
        //             //     id: data.id
        //             // })
        //         }
        //         else {

        //         }
        //     })
        //     .catch(e => console.log(e))
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



    function toggleTaskDialog() {
        dialogRef.current.click()
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

    return (
        <div className='task-pane' >
            <Card className='!bg-gray-200  h-fit !border-2 duration-75 ' >
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
                                <h1 className='uppercase text-xl tracking-wider font-semibold'>{taskPane.title}</h1>
                                <div className='flex items-center'>
                                    <Button onClick={() => dialogRef.current.click()} className='!cursor-pointer !bg-transparent !text-black hover:!bg-dark2 hover:!text-white'><MdEdit /></Button>
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
                            </div>

                            <div className='sub-task-container space-y-[10px] py-2'>
                                {
                                    subTasks.map(subTask => (
                                        <SubTask key={subTask.id} updateSubTask={updateSubTask} subTask={subTask} taskId={taskPane.id as string} projectId={projectId as string} />
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
                    <Button onClick={() => saveTaskPaneDesc()} className='!cursor-pointer !bg-gray-100 !text-black hover:!bg-dark2 hover:!text-white !my-2 !px-2 !py-4'>Save</Button>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    )
}


function SubTask({ key, updateSubTask, subTask, taskId, projectId }: { key: any, updateSubTask: any, subTask: SubTaskType, taskId: string, projectId: string }) {

    // const [subTask, setSubTask] = useState<SubTaskType>(props)
    const [ssubTask, ssetSubTask] = useState<SubTaskType>(subTask)

    useEffect(() => {

    })

    function saveSubTaskTitle() {
        const newSubTask: SubTaskType = {
            ...subTask,
            isEditMode: false
        }
        ssetSubTask(newSubTask);



        fetch(`http://localhost:3000/api/subtask?sname=${ssubTask.title}&tid=${taskId}&pid=${projectId}&subTaskId=${subTask.id}`)
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    // add
                    ssetSubTask(data)
                }
                else {

                }
            })
            .catch(e => console.log(e))

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
                        <TextField.Root className='flex items-center'>
                            <TextField.Input placeholder='Subtask' className='!p-2' value={ssubTask.title} onChange={e => ssetSubTask({ ...ssubTask, title: e.target.value })}></TextField.Input>
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
                            <div className=' flex-grow py-2 '>
                                <h1 className='uppercase text-sm px-2 tracking-wider font-semibold'>{ssubTask.title}</h1>
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

        </>
    )

}

export default TaskPane