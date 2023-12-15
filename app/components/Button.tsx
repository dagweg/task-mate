import React from 'react'

interface ButtonProps {
    label?: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    isForm?: boolean
}

function Button({ label, className, onClick, isForm = false }: ButtonProps) {
    return (
        isForm ?
            <input className={`items-center justify-center py-4  border-black rounded-sm outline outline-1 hover:bg-dark2 hover:text-white bg-gray-50  duration-50 ease-in-out ${className}`}>{label || "Get Started"}</input>
            :
            <button onClick={onClick} className={`items-center justify-center py-4  border-black rounded-sm outline outline-1 hover:bg-dark2 hover:text-white bg-gray-50  duration-50 ease-in-out ${className}`}>{label || "Get Started"}</button>
    )
}

export default Button