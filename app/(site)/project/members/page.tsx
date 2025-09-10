"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Role, User } from '@prisma/client'
import { Button, Dialog, DropdownMenu, IconButton, Separator } from '@radix-ui/themes'
import { IoIosMore } from 'react-icons/io'
import { BsInfoSquare } from 'react-icons/bs'
import { IoPersonAddSharp } from 'react-icons/io5'
import TextList from '@/app/components/TextList'
import TopNav from '@/app/components/TopNav'
import { FaRegTrashAlt } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'

function Members() {

    const [members, setMembers] = useState<User[]>([])
    const [userEmails, setUserEmails] = useState<string[]>([])
    const [selected, setSelected] = useState<User | null>(null)
    const [savingRole, setSavingRole] = useState(false)

    const dialogRef = useRef<any>();
    const roleChangeDialogRef = useRef<any>();


    const sp = useSearchParams()
    const pid = sp.get('pid')

    useEffect(() => {
        fetch(`/api/members`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pid })
        })
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    setMembers(data)
                }
            })
    }, [pid])

    function handleMemberRemove(uid: any) {
        fetch(`/api/members`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, pid })
        })
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
        fetch('/api/members/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmails, projectId: pid })
        })
            .then(async response => {
                const data = await response.json()

                if (response.ok) {
                    // Refresh list after adding
                    setUserEmails([])
                    fetch(`/api/members`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pid })
                    }).then(async r => {
                        const d = await r.json();
                        if (r.ok) setMembers(d)
                    })
                }
                else {

                }
            })
    }

    function handleRoleChange(user: User) {
        setSelected(user);
        roleChangeDialogRef.current.click();
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <TopNav links={[
                    { label: <IoPersonAddSharp />, link: "#", onClickCallback: () => toggleAddMemberDialog(), className: 'add-member relative hover:!bg-gray-200 hover:!text-black rounded-sm !w-fit ' },
                ]}
                    className='rounded-sm flex !gap-0 !space-x-0 h-full '>
                </TopNav>
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
                                                    <DropdownMenu.Item onClick={() => handleRoleChange(mem)} className=' !m-1  hover:!bg-gray-200  !text-black !flex  !flex-start !gap-3'>
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
                <RoleChangeDialog roleChangeDialogRef={roleChangeDialogRef} selected={selected} saving={savingRole} onSave={async (role: Role) => {
                    if (!selected) return;
                    setSavingRole(true)
                    await fetch('/api/members/role', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: selected.id, role })
                    }).then(async r => {
                        // refresh list
                        const res = await fetch(`/api/members`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pid }) })
                        const d = await res.json();
                        if (res.ok) setMembers(d)
                    }).finally(() => setSavingRole(false))
                }} />
            </Dialog.Root>

        </>
    )
}


function RoleChangeDialog({ roleChangeDialogRef, selected, onSave, saving }: { roleChangeDialogRef: any, selected: User | null, onSave: (role: Role) => void, saving: boolean }) {
    const [role, setRole] = useState<Role>(selected?.role || 'TEAM_MEMBER')
    useEffect(() => { setRole(selected?.role || 'TEAM_MEMBER') }, [selected])
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
                                    <p className='text-sm'>{selected?.firstName || '-'}</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Last Name:
                                    <p className='text-sm'>{selected?.lastName || '-'}</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Email:
                                    <p className='text-sm'>{selected?.email || '-'}</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    Role:
                                    <select value={role} onChange={e => setRole(e.target.value as Role)} className='border border-gray-300 rounded-md p-1'>
                                        <option value='TEAM_MEMBER'>Team Member</option>
                                        <option value='TEAM_MANAGER'>Administrator</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Dialog.Close>
                            <button disabled={!selected || saving} className='bg-transparent border-2 p-2 hover:bg-dark2 text-black hover:text-white w-52 rounded-sm duration-75 disabled:opacity-60' onClick={() => onSave(role)}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>

            </Dialog.Root>
        </>
    )
}

export default Members