'use client'

import React, { ReactElement, ReactNode, useState } from 'react'
import Link from 'next/link'
import { BiSolidDashboard } from 'react-icons/bi'
import { AiOutlineProject } from 'react-icons/ai'
import { BsFillChatFill } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'
import { FiSettings } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { BsPlusCircleFill } from 'react-icons/bs'
import classNames from 'classnames'
import './sidenav.css'
import { cn } from '../lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

function SideNav() {

    const {data:session} = useSession()
    const user = session?.user

    const handleLogoutClick = () => {
        // ToDo: ValidationPopup() component logic here
    }

    enum sb {
        enabled = 'w-[300px] transition-all duration-500',
        disabled = 'w-0 p-0 m-0  transition-all duration-300'
    }

    const [sideBar, setSideBar] = useState<string>(sb.disabled)

    const toggleSideBar = () => {
        if (sideBar === sb.enabled) {
            setSideBar(sb.disabled)
        }
        else {
            setSideBar(sb.enabled)
        }
    }

    return (
        <div className=' h-screen flex text-white w-fit z-10'>
            <div className={cn(`bg-dark2 h-full px-4 space-y-4 `,sideBar)}>

                <div className="user py-2 w-full flex flex-row gap-4 space-y-5 border-b border-b-[#3f3759]">
                    <div className="avatar relative h-[4rem] w-[4rem] rounded-full border-2 border-stone-500">
                            <Image className='rounded-full' src={user?.image as string} alt={user?.name as string} objectFit='cover' layout='fill' />
                    </div>
                    <div className="userName text-lg font-semibold">
                            Amanuel-1
                    </div>
                </div>
                
                <nav className={cn('flex w-full',sideBar)}>
                    <div className={cn('flex flex-col h-full w-full space-y-8 px-2 justify-between py-16',sideBar==sb.disabled?'hidden':'')}>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/dashboard'} className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <BiSolidDashboard className={'scale-150'} />
                                <label htmlFor="">Dashboard</label>
                            </Link>
                            <Link href={'/projects'} className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <AiOutlineProject className={'scale-150'} />
                                <label htmlFor="">Projects</label>
                                <div className='flex flex-grow justify-end'>
                                    {/* <BsPlusCircleFill /> */}
                                </div>
                            </Link>
                            <Link href={'/chat'} className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <BsFillChatFill className={'scale-150'} />
                                <label htmlFor="">Chat</label>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/settings'} className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <FiSettings className={'scale-150'} />
                                <label htmlFor="">Settings</label>
                            </Link>
                            <Link href={'/help&info'} className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <FiHelpCircle className={'scale-150'} />
                                <label htmlFor="">Help & Information</label>
                            </Link>
                            <div className='side-nav-button' onClick={() => setSideBar(sb.disabled)}>
                                <BiLogOut className={'scale-150'} />
                                <label htmlFor="">Logout</label>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={cn('h-[10%] w-full flex flex-col justify-center items-center text-[#a29eae]',sideBar==sb.disabled?'hidden':'')}>
                    <h1 className='text-2xl font-bold tracking-wide '><i></i>TaskMate</h1>
                </div>
            </div>
            <div className={`${classNames({
                "h-full flex flex-col justify-center overflow-visible relative bg-dark2 w-2 cursor-pointer hover:bg-gray-100 duration-200 ": true,
            })}`} onClick={toggleSideBar}>
                <i className={classNames({
                    'fa-solid absolute  text-black cursor-pointer active:scale-95 p-3 duration-150': true,
                    'fa-angles-right rounded-r-full hover:bg-gray-200 hover:shadow-2xl': sideBar === sb.disabled,
                    'fa-angles-left rounded-l-full -translate-x-10 text-white hover:bg-white hover:bg-opacity-20 hover:shadow-2xl': sideBar === sb.enabled,
                })} onClick={toggleSideBar}></i>
            </div>
        </div>
    )
}

export default SideNav