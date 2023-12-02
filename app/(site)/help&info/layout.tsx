import React, { ReactNode } from 'react'
import Link from 'next/link'
import './help&info.css'
import TopNav from '../components/TopNav'

function HelpAndInfoLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-20 flex flex-col gap-10 h-screen'>
            <div>
                <h1 className='text-5xl font-bold '>Help and Information</h1>
            </div>
            <TopNav links={[
                { label: "FAQ", link: '/help&info/faq' },
                { label: "Terms of use", link: '/help&info/terms-of-use' },
                { label: "Privacy Policy", link: '/help&info/privacy-policy' },
                { label: "About us", link: '/help&info/about-us' },
            ]} />
            <div className='bg-gray-100 rounded-md w-full flex-grow p-5'>
                {children}
            </div>
        </div>
    )
}

export default HelpAndInfoLayout