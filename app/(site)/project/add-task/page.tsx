import TextBox from '@/app/components/TextBox'
import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";

function AddTask() {
    return (
        <div className='bg-gray-50 shadow-md w-[300px] min-w-fit h-[400px] min-h-fit  p-4'>
            <div className=''>
                <h1>Task title</h1>
                <input type="text" className='border border-b-black active: oultine-none rounded-lg p-1' />
            </div>

        </div>
    )
}

export default AddTask