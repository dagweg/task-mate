import Image from 'next/image'
import React from 'react'

interface ChatMessageProps {
    username?: string,
    profile?: string,
    message?: string,
}

function ChatMessage({ username, profile, message }: ChatMessageProps) {
    return (
        <div className='flex gap-2 items-end'>
            {/* <div className='bg-orange-300 h-12 w-12 rounded-full'></div> */}
            <Image src="" alt='profile-pic' className='h-12 w-12 rounded-full' />
            <div className='bg-white rounded-r-3xl rounded-t-3xl max-w-[350px] p-4'>
                <h1 className='font-semibold'>{username}</h1>
                <p className='text-sm'>{message}</p>
            </div>
        </div >
    )
}

export default ChatMessage