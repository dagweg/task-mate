import Image from 'next/image'
import React from 'react'

interface ChatMessageProps {
    username?: string,
    message?: string,
    imageSrc?: string
}

function ChatMessage({ username, message, imageSrc }: ChatMessageProps) {
    return (
        <div className='flex gap-2 items-end'>
            <div className='!h-12 !w-12 overflow-hidden rounded-full'>
                <Image src={`https://i.imgur.com/3l5pIUM.jpg`} alt='profile-pic' className='h-full w-full scale-150 ' height={1} width={1} unoptimized />
            </div>
            <div className='bg-white rounded-r-3xl rounded-t-3xl max-w-[350px] p-4'>
                <h1 className='font-semibold'>{username}</h1>
                <p className='text-sm'>{message}</p>
            </div>
        </div >
    )
}

export default ChatMessage