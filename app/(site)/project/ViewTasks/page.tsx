'use client'
import React, { useEffect, useRef, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { Button, Dialog, DropdownMenu, IconButton, Select } from '@radix-ui/themes'
import { IoIosMore } from 'react-icons/io'
import { BsBack, BsBackspace, BsInfoSquare } from 'react-icons/bs'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { TfiCalendar } from "react-icons/tfi";
import { BiBullseye } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import TextBox from '@/app/components/TextBox'
import TextList from '@/app/components/TextList'
import ButtonRound from '@/app/components/ButtonRound'
function ViewTasks() {

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex gap-5'>
                    <div className='text-3xl hover:translate-x-1 duration-75 scale-105 active:scale-90' onClick={() => window.history.back()}>
                        <IoArrowBackCircleOutline></IoArrowBackCircleOutline>
                    </div>
                    <GoTasklist />    <h1 className='text-3xl font-semibold'> VIEW TASK</h1>
                </div>
            </div>
            <div className="flex min-h-screen justify-center w-full">
                <table className='w-full'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                            <th className='w-34 p-3 text-sm font-semibold -tracking-wide text-left' >Name</th>
                            <th className='w-20 p-3 text-sm font-semibold -tracking-wide text-left' ><TfiCalendar />Due date</th>
                            <th className='w-24 p-3 text-sm font-semibold -tracking-wide text-left' > <BiBullseye />status</th>
                            <th className='w-32 p-3 text-sm font-semibold -tracking-wide text-left'>assign</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900 divide-y divide-gray-100 pl-2">
                        <tr>
                            <td className='p-3 text-sm text-gray-700'></td>
                            <td className='p-3 text-sm text-gray-700'></td>
                            <td className='p-3 text-sm text-gray-700'>
                                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange rounded-lg bg-opacity-50'>IN_PROGRESS</span>
                            </td>
                            <td className='p-3 text-sm text-gray-700'></td>
                        </tr>
                        <tr>
                            <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding */}
                                Child Name
                            </td>
                            <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding */}
                                Child Due date
                            </td>
                            <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding */}
                                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange rounded-lg bg-opacity-50'>IN_PROGRESS</span>
                            </td>
                            <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding */}
                                Child Assign
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default ViewTasks