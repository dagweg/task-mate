import React, { ReactNode } from 'react'
import './help&info.css'
import TopNav from '@/app/components/TopNav'

function HelpAndInfoLayout({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-col gap-6 min-h-screen'>
            <div>
                <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>Help and Information</h1>
            </div>
            <TopNav links={[
                { label: "FAQ", link: '/help&info/faq' },
                { label: "Terms of use", link: '/help&info/terms-of-use' },
                { label: "Privacy Policy", link: '/help&info/privacy-policy' },
                // { label: "About us", link: '/help&info/about-us' },
            ]} />
            <div className='bg-white rounded-xl w-full flex-grow p-6 border border-gray-200'>
                {children}
            </div>
        </div>
    )
}

export default HelpAndInfoLayout