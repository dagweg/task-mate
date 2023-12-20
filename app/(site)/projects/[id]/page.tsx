'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

function Project() {

    const pathname = usePathname()

    let paths = pathname.split('/')
    let path = decodeURIComponent(paths[paths.length - 1])

    return (
        <div className='text-2xl'>Project: <span className='font-bold'>{path}</span></div>
    )
}

export default Project