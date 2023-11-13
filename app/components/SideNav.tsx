import React from 'react'
import Link from 'next/link'
import { BiSolidDashboard } from 'react-icons/bi'
import { AiOutlineProject } from 'react-icons/ai'
import { BsFillChatFill } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'
import { FiSettings } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { BsPlusCircleFill } from 'react-icons/bs'
import './sidenav.css'

function SideNav() {

    const handleLogoutClick = () => {
        // ToDo: ValidationPopup() component logic here
    }

    return (
        <div className='fixed bg-dark2 h-screen w-[300px] text-white'>
            <div className='h-full flex flex-col w-[80%] mx-auto'>
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
        </div>
    )
}

export default SideNav