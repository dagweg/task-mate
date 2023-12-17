import React, { ReactNode } from 'react'

interface Props {
    label: string | ReactNode,
    className?: string
    onClick?: any
}

function ButtonRound({ label, className, onClick }: Props) {
    return (
        <div onClick={onClick} className={`bg-dark2 text-white p-4 rounded-lg hover:bg-dark1 cursor-pointer active:scale-105 duration-150 ease-in-out ${className}`}>{label}</div>
    )
}

export default ButtonRound