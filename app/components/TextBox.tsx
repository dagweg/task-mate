import React, { ReactNode } from 'react'

interface TextBoxProps {
    label?: string,
    placeholder?: string,
    className?: string,
    type?: string,
    onChange?: any,
    currentValue?: string,
    ref?: any,
    onBlur?: any
}


function TextBox({ label, placeholder, className, type, onChange, onBlur, currentValue, ref }: TextBoxProps) {
    return (
        <div className={`text-field flex flex-col`}>
            <label htmlFor="">{label}</label>
            <input ref={ref} type={type || "text"} onChange={onChange} onBlur={onBlur} autoFocus name="" id="" value={currentValue} placeholder={placeholder || ''} className={`outline-none border border-black  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4 text-sm ${className}`} >
            </input>
        </div>
    )
}

export default TextBox