import React, { ReactNode } from 'react'
import Link from 'next/link'
import './help&info.css'

function HelpAndInfoLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-20 flex flex-col gap-10 h-screen'>
            <div>
                <h1 className='text-5xl font-bold '>Help and Information</h1>
            </div>
            <nav className='bg-gray-100 w-full h-12 rounded-full flex items-center p-2 gap-8'>
                <Link className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center' href={'/help&info/faq'}><div>FAQ</div></Link>
                <Link className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center' href={'/help&info/privacy-policy'}><div>Privacy Policy</div></Link>
                <Link className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center' href={'/help&info/terms-of-use'}><div>Terms of Use</div></Link>
                <Link className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center' href={'/help&info/about-us'}><div>About us</div></Link>
            </nav>
            <div className='bg-gray-100 rounded-md w-full flex-grow p-5'>
                {children}
            </div>
        </div>
    )
}

export default HelpAndInfoLayout