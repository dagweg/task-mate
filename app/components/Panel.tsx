import React, { ReactNode } from 'react'

interface Props {
    text: string | ReactNode,
    className?: string
}

function Panel({ text, className }: Props) {
    return (
        <div className={`bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3  duration-200 cursor-pointer ${className}`}>
            {text}
            <i></i>
        </div>
    )
}

export default Panel