import React, { ReactNode } from 'react'
import Link from 'next/link'


interface TypeLink {
    label: string | ReactNode,
    link: string,
    className?: string,
    onClickCallback?: any
}

interface Props {
    links: TypeLink[],
    className?: string,
}

function TopNav({ links, className }: Props) {
    return (
        <nav className={`bg-gray-100 w-full h-12 rounded-full flex items-center p-2 gap-8 ${className}`}>
            {links.map((link, index) => (
                <Link key={index} onClick={link.onClickCallback} className={`p-2 rounded-full w-[100px] cursor-pointer hover:bg-dark1 hover:text-white  active:scale-105 duration-150 ease-in-out border-black max-h-full min-w-fit flex justify-center px-10 items-center ${link.className}`} href={link.link}><div>{link.label}</div></Link>
            ))}
        </nav>
    )
}

export default TopNav