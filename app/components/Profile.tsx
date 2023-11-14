import React from 'react'

interface Props { username: string, email?: string, imgClass?: string, nmClass?: string, emClass?: string }

function Profile({ username, email, imgClass, nmClass, emClass }: Props) {

    const colors = [
        'bg-orange-300',
        'bg-green-300',
        'bg-pink-300',
        'bg-purple-300',
        'bg-yellow-300',
        'bg-gray-300',
        'bg-sky-300',
        'bg-slate-300',
        'bg-blue-300',
        'bg-indigo-300',
        'bg-purple-300',
    ]

    return (
        <div className='hover:scale-105 duration-150 ease-in-out rounded-xl p-3 hover:bg-gray-200 cursor-pointer flex  items-center gap-3'>
            <div className={`${colors[Math.floor(Math.random() * colors.length)]} ${imgClass} h-12 w-12 rounded-full`}></div>
            <div>
                <p className={`text-sm font-semibold ${nmClass}`}>{username}</p>
                <p className={`text-sm font-semibold ${emClass}`}>{email}</p>
            </div>
        </div>
    )
}

export default Profile