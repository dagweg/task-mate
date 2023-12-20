import React, { ReactNode } from 'react'
import Link from 'next/link'
import TopNav from '@/app/components/TopNav'


function layout({ children }: { children: ReactNode }) {
    return (
        <div className='p-20 flex flex-col gap-10 h-screen'>
            <div className='flex flex-col justify-between w-full gap-4'>
                <h1 className='text-5xl font-bold '>Settings</h1>
                <TopNav links={[
                    { label: "General", link: "/settings/general" },
                    { label: "Account Settings", link: "/settings/account-settings" },
                ]} />
            </div>
            <div className='w-full h-full bg-gray-50 rounded-lg shadow-md'>
                {children}
            </div>
        </div>
    )
}

export default layout