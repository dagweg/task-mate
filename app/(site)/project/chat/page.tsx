'use client'

import React, { useEffect, useState } from 'react'
import { ImAttachment } from 'react-icons/im'
import { BsEmojiSmile } from 'react-icons/bs'
import { BsMicFill } from 'react-icons/bs'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { TextField } from '@radix-ui/themes'
import './chat.css'
import ChatMessage from '../../../components/ChatMessage'

function Chat() {

    const [emojis, setEmojis] = useState<any>([])

    useEffect(() => {
        fetch('https://emoji-api.com/emojis?access_key=1611a24c17507d2e9be80d8dd5efd6d1d1a377d4')
            .then(async response => {
                const data = await response.json()
                if (response.ok) {
                    setEmojis(data)
                    console.log('Fetched emojis')
                }
                else {
                    console.log('Couldnt fetch emojis')
                }
            })
            .catch(e => console.log(e))

    }, [])

    return (
        <div className='flex flex-col gap-10 h-screen'>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='bg-[#a6a1b1] w-full h-full flex justify-center rounded-lg shadow-sm bg-opacity-10'>
                    <div className='bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col flex-grow h-full p-4 gap-4    '>
                        <div className='flex flex-col flex-grow justify-end gap-2'>
                            <ChatMessage username='Riley' message='We have meeting today afternoon' />

                        </div>
                        <TextField.Root className='p-2'>
                            <TextField.Slot>
                                <ImAttachment />
                            </TextField.Slot>
                            <TextField.Input placeholder='' radius='full' className='!text-[14px]'></TextField.Input>
                            <TextField.Slot>
                                <BsEmojiSmile />
                                <BsMicFill />
                                <RiSendPlane2Fill />
                            </TextField.Slot>
                        </TextField.Root>
                    </div>
                    <div className='w-[250px] flex flex-col  p-3 overflow-y-scroll'>
                        <h1 className=''>Emojis</h1>
                        <div className='grid grid-cols-8  space-x-1 '>
                            {
                                emojis && emojis.map((emoji: any, key: any) => (
                                    <span className='rounded-full hover:bg-gray-200 duration-75 aspect-square cursor-pointer flex justify-center items-center p-1'>{emoji.character}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat