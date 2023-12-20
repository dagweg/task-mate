'use client'

import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { User } from '@prisma/client'
import { Dialog, DropdownMenu, IconButton } from '@radix-ui/themes'
import { IoIosMore } from 'react-icons/io'

function Members() {

    const [members, setMembers] = useState<User[]>([])

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

    return (
        <>
            <div>Members</div>
            <div className="flex min-h-screen justify-center w-full">
                <div className="overflow-x-auto min-w-full">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead className='min-w-full'>
                            <tr className="bg-blue-gray-100 text-gray-700 min-w-full">
                                <th className="py-3 px-4 text-left">First Name</th>
                                <th className="py-3 px-4 text-left">Last Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                            </tr>
                        </thead>
                        {
                            members.length === 0 ?
                                <tr className='flex text-center self-center items-center justify-center w-full py-10'>
                                    waiting for team members to join...
                                </tr>
                                :
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
                                                    <DropdownMenu.Item onClick={() => handleMemberRemove(mem.id)} className=' !m-1  hover:!bg-red-500 hover:!text-white !text-black'>Remove Member</DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Root>
                                        </tr>
                                    ))}
                                </tbody>
                        }


                    </table>
                </div>
            </div>

        </>
    )
}

export default Members