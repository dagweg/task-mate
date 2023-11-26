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

function SideNav() {

    const handleLogoutClick = () => {
        // ToDo: ValidationPopup() component logic here
    }

    enum sb {
        enabled = 'w-[300px]',
        disabled = 'w-0 hidden'
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
        <div className='fixed h-screen flex text-white w-fit z-10'>
            <div className={`bg-dark2 h-full  ${sideBar} px-4`}>
                <div className='h-[10%] flex flex-col justify-center items-center'>
                    <h1 className='text-2xl font-bold tracking-wide'><i></i>TaskMate</h1>
                </div>
                <nav className='flex-grow'>
                    <div className='flex flex-col h-full space-y-8 justify-between py-20'>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/dashboard'} className='side-nav-button'>
                                <BiSolidDashboard className={'scale-150'} />
                                <label htmlFor="">Dashboard</label>
                            </Link>
                            <Link href={'/projects'} className='side-nav-button'>
                                <AiOutlineProject className={'scale-150'} />
                                <label htmlFor="">Projects</label>
                                <div className='flex flex-grow justify-end'>
                                    {/* <BsPlusCircleFill /> */}
                                </div>
                            </Link>
                            <Link href={'/chat'} className='side-nav-button'>
                                <BsFillChatFill className={'scale-150'} />
                                <label htmlFor="">Chat</label>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link href={'/settings'} className='side-nav-button'>
                                <FiSettings className={'scale-150'} />
                                <label htmlFor="">Settings</label>
                            </Link>
                            <Link href={'/help&info'} className='side-nav-button'>
                                <FiHelpCircle className={'scale-150'} />
                                <label htmlFor="">Help & Information</label>
                            </Link>
                            <div className='side-nav-button' >
                                <BiLogOut className={'scale-150'} />
                                <label htmlFor="">Logout</label>
                            </div>
                        </div>
                    </div>
                </nav>
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