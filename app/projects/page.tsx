import Link from 'next/link'
import React from 'react'

function Projects() {
    return (
        <div className='grid grid-cols-3  grid-rows-2 justify-center h-screen gap-8'>
            <Link href={'/project/[id]'} as={'/project/NextGen LMS'}>
                <div className='relative  overflow-hidden bg-[#a6a1b1] w-full h-fit max-w-[500px] p-20 flex flex-col rounded-3xl shadow-xl bg-opacity-10 hover:scale-105 duration-200 hover:outline-dashed cursor-pointer active:scale-100'>
                    {/* <h1 className='bg-gray-200 absolute left-0 top-0 p-4 w-[50%]'>LMS Software</h1>
                <h1 className='bg-gray-200 absolute right-0 top-0 p-4 w-[50%]'>8/10 Members</h1> */}
                    <h1 className='font-bold tracking-wide text-2xl py-2'>NextGen LMS</h1>
                    <p className='text-sm'>
                        The NextGen LMS project aims to develop a cutting-edge Learning Management System to facilitate efficient and interactive online education. This software will serve as a comprehensive platform for educational institutions, businesses, and organizations to manage, deliver, and track learning content and activities.
                    </p>
                    <div className='bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8'>
                        8/25 Members
                    </div>
                </div>
            </Link>
            <Link href={'/project/[id]'} as={'/project/CryptoHub'}>
                <div className='relative  overflow-hidden bg-[#a6a1b1] w-full  h-fit max-w-[500px] p-20 flex flex-col rounded-3xl shadow-xl bg-opacity-10 hover:scale-105 duration-200 hover:outline-dashed cursor-pointer active:scale-100'>
                    {/* <h1 className='bg-gray-200 absolute left-0 top-0 p-4 w-[50%]'>LMS Software</h1>
                <h1 className='bg-gray-200 absolute right-0 top-0 p-4 w-[50%]'>8/10 Members</h1> */}
                    <h1 className='font-bold tracking-wide text-2xl py-2'>CryptoHub</h1>
                    <p className='text-sm'>
                        CryptoHub is a comprehensive online platform designed for cryptocurrency enthusiasts, investors, and traders. It serves as a one-stop destination for staying informed about the latest developments in the crypto world, managing digital assets, and accessing a range of tools for trading and analysis.
                    </p>
                    <div className='bg-gray-200 w-fit p-2 rounded-lg font-semibold shadow-sm mt-8'>
                        12/25 Members
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Projects 