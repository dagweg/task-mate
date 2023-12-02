import React from 'react'

function FAQ() {
    return (
        <div>
            <div className='p-5'>
                <h1 className='font-bold text-2xl '>Frequenty asked questions.</h1>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out'>
                    <h1 className='font-semibold'>What is TaskMate?</h1>
                    <div>
                        <p>It is a free task management and collaboration web application.</p>
                    </div>
                </div>
                <div className='bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out'>
                    <h1 className='font-semibold'>Is it actually free?</h1>
                    <div>
                        <p>Yes, it is!</p>
                    </div>
                </div>
                <div className='bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out'>
                    <h1 className='font-semibold'>For who is this for?</h1>
                    <div>
                        <p>Are you working on a project? Even as small as a school project to big enterprise projects. We got you covered!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ