'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { User } from '@prisma/client'
import { Button, Dialog, DropdownMenu, IconButton, Separator, Slot } from '@radix-ui/themes'
import { IoIosMore } from 'react-icons/io'
import { BsBack, BsBackspace, BsInfoSquare } from 'react-icons/bs'
import { IoArrowBackCircleOutline, IoPersonAddOutline, IoPersonAddSharp, IoRemove } from 'react-icons/io5'
import TextBox from '@/app/components/TextBox'
import TextList from '@/app/components/TextList'
import ButtonRound from '@/app/components/ButtonRound'
import TopNav from '@/app/components/TopNav'
import { FaRegTrashAlt } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'

function Members() {

    const [members, setMembers] = useState<User[]>([])
    const [userEmails, setUserEmails] = useState<string[]>([])

    const dialogRef = useRef<any>();
    const roleChangeDialogRef = useRef<any>();


    const sp = useSearchParams()
    const pid = sp.get('pid')

    useEffect(() => {
        fetch(`http://localhost:3000/api/members?pid=${pid}`)
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    setMembers(data)
                }
            })
    }, [])

    function handleMemberRemove(uid: any) {
        fetch(`http://localhost:3000/api/members?pid=${pid}&uid=${uid}`)
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    setMembers(data)
                }
            })
    }

    function toggleAddMemberDialog() {
        dialogRef.current.click()
    }

    function addMembers() {
        fetch('http://localhost:3000/api/members/add', {
            method: "POST",
            body: JSON.stringify({
                userEmails: userEmails,
                projectId: pid,
            })
        })
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    console.log(data)
                }
                else {

                }
            })
    }

    function handleRoleChange() {
        roleChangeDialogRef.current.click();
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    {/* <div className='text-3xl hover:translate-x-1 duration-75 scale-105 active:scale-90' onClick={() => window.history.back()}>
                        <IoArrowBackCircleOutline></IoArrowBackCircleOutline>
                    </div> */}
                    {/* <h1 className='text-3xl font-semibold'>Members</h1> */}
                </div>
                <TopNav links={[
                    { label: <IoPersonAddSharp />, link: "#", onClickCallback: () => toggleAddMemberDialog(), className: 'add-member relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit ' },
                    // { label: <IoStatsChart />, link: "#", className: 'generate-task-report  relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit ' }
                ]}
                    className='rounded-sm flex !gap-0 !space-x-0 h-full '>

                </TopNav>
                {/* <div className='text-3xl hover:bg-gray-100 rounded-full p-2 active:bg-transparent cursor-pointer' onClick={() => toggleAddMemberDialog()}>
                    <IoPersonAddOutline></IoPersonAddOutline>
                </div> */}
            </div>
            <div className="flex min-h-screen justify-center w-full">
                <div className="overflow-x-auto min-w-full">
                    {
                        members.length === 0 ?
                            <div className=' h-full flex flex-col justify-center '>
                                <tr className='text-center self-center justify-center w-full py-10 text-lg bg-gradient-to-r from-gray-50 to bg-slate-50 rounded-lg'>
                                    waiting for team members to join...
                                </tr>
                            </div>
                            :
                            <table className="min-w-full bg-white shadow-md rounded-xl">
                                <thead className='min-w-full'>
                                    <tr className="bg-blue-gray-100 text-gray-700 min-w-full">
                                        <th className="py-3 px-4 text-left">First Name</th>
                                        <th className="py-3 px-4 text-left">Last Name</th>
                                        <th className="py-3 px-4 text-left">Email</th>
                                        <th className="py-3 px-4 text-left">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {members.map((mem: User, i) => (
                                        <tr key={i} className="border-b border-blue-gray-200">
                                            <td className="py-3 px-4">{mem.firstName}</td>
                                            <td className="py-3 px-4">{mem.lastName}</td>
                                            <td className="py-3 px-4">{mem.email}</td>
                                            <td className="py-3 px-4">{mem.role}</td>
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger>
                                                    <IconButton className=' !m-1 !bg-gray-200 hover:!bg-neutral-300 !text-xl !text-black'><IoIosMore /></IconButton>
                                                </DropdownMenu.Trigger>
                                                <DropdownMenu.Content className='min-w-[10rem]'>
                                                    <DropdownMenu.Item onClick={() => handleRoleChange()} className=' !m-1  hover:!bg-gray-200  !text-black !flex  !flex-start !gap-3'>
                                                        <RiAdminFill />
                                                        <label htmlFor="">Change Role</label>
                                                    </DropdownMenu.Item>
                                                    <Separator className='!w-full px-4' />
                                                    <DropdownMenu.Item onClick={() => handleMemberRemove(mem.id)} className=' !m-1  hover:!bg-red-500 hover:!text-white !text-black !flex  !flex-start !gap-3'>
                                                        <FaRegTrashAlt />
                                                        <label htmlFor="">Remove Member</label>
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Root>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div>
            </div>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button ref={dialogRef} className='!hidden'></Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <div className='flex flex-col gap-10 justify-center'>
                        <div>
                            <h1 className='font-semibold'>Add team members</h1>
                            <div className='flex flex-col gap-3 justify-center my-2'>
                                <div className='flex gap-4 items-center'>
                                    <BsInfoSquare />
                                    <p className='text-sm'>To add members write their email address and press [Enter].</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <BsInfoSquare />
                                    <p className='text-sm'>To remove members click on the email you just added.</p>
                                </div>
                            </div>
                            <div className='flex gap-1  max-w-full'>
                                <TextList emailList={userEmails} setEmailList={setUserEmails} />
                            </div>
                        </div>
                        <Dialog.Close>
                            <button className='bg-transparent border-2 p-2 hover:bg-dark2 text-black hover:text-white w-52 rounded-sm duration-75' onClick={addMembers}>
                                Add
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
                <RoleChangeDialog roleChangeDialogRef={roleChangeDialogRef} />
            </Dialog.Root>

        </>
    )
}


function RoleChangeDialog({ roleChangeDialogRef }: any) {

    function saveRoleChange() {

    }
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button ref={roleChangeDialogRef} className='!hidden'></Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <div className='flex flex-col gap-10 justify-center'>
                        <div>
                            <h1 className='font-semibold'>Change Role</h1>
                            <div className='flex flex-col gap-3 justify-center my-2'>
                                <div className='flex gap-4 items-center'>
                                    First Name:
                                    <p className='text-sm'>###.</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Last Name:
                                    <p className='text-sm'>###.</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Email:
                                    <p className='text-sm'>###.</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Role:
                                    <select name="" id="">
                                        <option value="">Team Member</option>
                                        <option value="">Administrator</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Dialog.Close>
                            <button className='bg-transparent border-2 p-2 hover:bg-dark2 text-black hover:text-white w-52 rounded-sm duration-75' onClick={saveRoleChange}>
                                Save Changes
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>

            </Dialog.Root>
        </>
    )
}

export default Members