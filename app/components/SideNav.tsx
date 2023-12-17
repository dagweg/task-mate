'use client'

import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
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
import { FaUserAlt } from "react-icons/fa";

function SideNav() {

    // const { data: session } = useSession()
    // const user = session?.user


    const handleLogoutClick = () => {
        // ToDo: ValidationPopup() component logic here
    }

    enum sb {
        enabled = 'w-[300px] transition-all duration-500',
        disabled = 'w-fit p-0 m-0  transition-all duration-300'
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

    useEffect(() => {
        console.log('/n/n/n')
        // here is a test, and its working,
        /// retrieving hte userId from local storage
        // lets see it!
        console.log(localStorage.getItem('userId'))
        // console.log(user?.name as string)
    })

    return (
        <div className=' h-screen flex text-white w-fit z-10'>
            <div className={cn(`bg-dark2 h-full space-y-4`, sideBar, sb.disabled == sideBar ? 'flex flex-col items-center' : '')}>

                <div className="user py-5 w-full flex items-center  gap-4  border-b border-b-[#3f3759] px-2">
                    {
                        // user?.image ?
                        //     <div className="avatar relative min-h-[4rem] min-w-[4rem] rounded-full border-2 border-stone-500 flex justify-center mx-2">
                        //         <Image className='rounded-full' src={user?.image as string} alt={user?.name as string} objectFit='cover' layout='fill' />
                        //     </div>
                        //     :
                        <div className='w-full flex justify-center'>
                            <div className='p-4 bg-dark1 rounded-full'>
                                <FaUserAlt className='!text-4xl ' />
                            </div>
                        </div>
                    }
                    {/* <div className={cn(sideBar == sb.enabled ? "userName text-lg font-semibold" : 'hidden')}>
                        {sideBar == sb.enabled && user?.name}
                    </div> */}
                </div>

                <nav className={cn('flex w-full', sideBar)}>
                    <div className={cn('flex flex-col h-full w-full space-y-8 px-2 justify-between py-16')}>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/dashboard'} className='side-nav-button'>
                                <BiSolidDashboard className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Dashboard</label>
                            </Link>
                            <Link href={'/projects'} className='side-nav-button'>
                                <AiOutlineProject className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Projects</label>
                            </Link>
                            <Link href={'/chat'} className='side-nav-button'>
                                <BsFillChatFill className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Chat</label>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/settings'} className='side-nav-button'>
                                <FiSettings className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Settings</label>
                            </Link>
                            <Link href={'/help&info'} className='side-nav-button'>
                                <FiHelpCircle className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Help & Information</label>
                            </Link>
                            <div className='side-nav-button'>
                                <BiLogOut className={'scale-150'} />
                                <label htmlFor="" className={cn(sb.disabled == sideBar ? 'hidden' : '')}>Logout</label>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={cn('h-[10%] w-full flex flex-col justify-center items-center text-[#a29eae]', sideBar == sb.disabled ? 'hidden' : '')}>
                    <h1 className='text-2xl font-bold tracking-wide '><i></i>TaskMate</h1>
                    <p>Alpha Build</p>
                </div>
            </div>
            <div className={`${classNames({
                "h-full flex flex-col justify-center overflow-visible w-2 cursor-pointer  duration-200 ": true,
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