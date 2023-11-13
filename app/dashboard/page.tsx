import React from 'react'
import './dashboard.css'

function Dashboard() {
    return (
        <div className='p-20 flex flex-col gap-10'>
            <div>
                <h1 className='text-5xl font-bold '>Dashboard</h1>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-7 w-full'>
                <div className='w-full h-96 bg-[#B9B4C7] rounded-lg  shadow-lg'></div>
                <div className='w-full h-96 bg-[#B9B4C7] rounded-lg  shadow-lg '></div>
                <div className='w-full h-96 bg-[#B9B4C7] rounded-lg  shadow-lg col-span-2'></div>
            </div>
        </div>
    )
}

export default Dashboard