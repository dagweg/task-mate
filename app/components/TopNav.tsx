import React from 'react'
import Link from 'next/link'

interface TypeLink {
    label: string,
    link: string
}

function TopNav({ links }: { links: TypeLink[] }) {
    return (
        <nav className='bg-gray-100 w-full h-12 rounded-full flex items-center p-2 gap-8'>
            {links.map((link, index) => (
                <Link key={index} className='p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center' href={link.link}><div>{link.label}</div></Link>
            ))}
        </nav>
    )
}

export default TopNav