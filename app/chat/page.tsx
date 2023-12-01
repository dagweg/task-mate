'use client'

import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { ImAttachment } from 'react-icons/im'
import { BsEmojiSmile } from 'react-icons/bs'
import { BsMicFill } from 'react-icons/bs'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { TextField } from '@radix-ui/themes'
import './chat.css'
import ChatMessage from '../components/ChatMessage'

function Chat() {
    return (
        <div className='flex flex-col gap-10 h-screen'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='bg-[#a6a1b1] w-full h-full flex justify-center rounded-lg shadow-sm bg-opacity-10'>
                    <div className='bg-gray-100 w-[30%] h-full'>
                        <div className='flex p-4'>
                            <TextField.Root className='flex-grow'>
                                <TextField.Slot>
                                    <FiSearch />
                                </TextField.Slot>
                                <TextField.Input placeholder='Search members' radius='full'></TextField.Input>
                            </TextField.Root>
                        </div>
                    </div>
                    <div className='bg-gray-300 flex flex-col flex-grow h-full p-4 gap-4    '>
                        <div className='flex flex-col flex-grow justify-end gap-2'>
                            <ChatMessage username='Riley' message='We have meeting today afternoon' />
                            <div className='flex gap-2 items-end'>
                                <div className='bg-blue-300 h-12 w-12 rounded-full'></div>
                                <div className='bg-white rounded-r-3xl rounded-t-3xl max-w-[350px] p-4'>
                                    <h1 className='font-semibold'>Tyler</h1>
                                    <p className='text-sm'>Way over due imo.</p>
                                </div>
                            </div>
                        </div>
                        <TextField.Root className='p-4'>
                            <TextField.Slot>
                                <ImAttachment />
                            </TextField.Slot>
                            <TextField.Input placeholder='' radius='full' className='!text-[16px]'></TextField.Input>
                            <TextField.Slot>
                                <BsEmojiSmile />
                                <BsMicFill />
                                <RiSendPlane2Fill />
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                    <div className='w-[20%] h-full p-5'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-gray-300 aspect-square w-16 rounded-full'></div>
                            <div>
                                <h1 className=''>Group Name</h1>
                                <h1 className='text-xs'>10 members</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat