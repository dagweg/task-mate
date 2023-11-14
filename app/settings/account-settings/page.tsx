import Profile from '@/app/components/Profile'
import React from 'react'

function AccountSettings() {
    return (
        <div className='grid grid-cols-2 gap-4 h-full'>
            <div className='border-[#2227] border-r-2 shadow-sm w-full p-10 flex flex-col gap-10'>
                <div>
                    <h1 className='text-lg font-semibold'>Profile</h1>
                    <div className='my-5 flex gap-5 items-center w-[70%] mx-auto justify-between'>
                        <Profile username='Dagmawi' email='dagtef@gmail.com' imgClass='p-20' nmClass='text-2xl font-black tracking-wider' emClass={'!text-xs'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings