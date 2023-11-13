import React from 'react'
import './help&info.css'

function HelpAndInfo() {
    return (
        <div className='p-20 flex flex-col gap-10'>
            <div>
                <h1 className='text-5xl font-bold '>Help and Information</h1>
            </div>
            <nav className='bg-gray-100 w-full h-12 rounded-full flex items-center p-2 gap-8'>
                <div className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center'>FAQ</div>
                <div className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center'>Privacy Policy</div>
                <div className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center'>Terms of Use</div>
                <div className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center'>About us</div>
            </nav>
            <div className='bg-red-500 w-full h-full'></div>
        </div>
    )
}

export default HelpAndInfo