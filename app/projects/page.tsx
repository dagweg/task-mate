import React from 'react'

function Projects() {
    return (
        <div className='p-20 flex flex-col gap-10 h-screen'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-5xl font-bold '>Projects</h1>
                <div className='bg-dark2 text-white p-4 rounded-lg hover:bg-dark1 cursor-pointer active:scale-105 duration-150 ease-in-out'><i className='fa-solid fa-plus mx-4'></i>Add Project</div>
            </div>
            <div className='flex flex-col justify-center items-center h-full'>
                <div className='bg-[#a6a1b1] w-full h-full flex flex-col justify-center items-center rounded-3xl shadow-xl bg-opacity-10'>
                    <h1 className='text-xl'>There are currently no projects</h1>
                </div>
            </div>
        </div>
    )
}

export default Projects