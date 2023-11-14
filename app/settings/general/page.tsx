import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

function GeneralSettings() {
    return (
        <div className='grid grid-cols-2 gap-4 h-full'>
            <div className='border-[#2227] border-r-2 shadow-sm w-full p-10 flex flex-col gap-10'>
                <div>
                    <h1 className='text-lg font-semibold'>Appearance</h1>
                    <div className='my-5 flex gap-5 items-center w-[70%] mx-auto justify-between'>
                        <h1 className='font-semibold text-sm'>Theme</h1>
                        <div className='flex '>
                            <div className='bg-[#eeeeee] hover:bg-light2 cursor-pointer active:scale-95 origin-right text-black px-5 py-3 rounded-l-full flex gap-2 items-center'>
                                <MdDarkMode />
                                Dark
                            </div>
                            <div className='bg-[#eeeeee] hover:bg-light2 cursor-pointer active:scale-95 origin-left text-black px-5 py-3 rounded-r-full flex gap-2 items-center'>
                                Light
                                <MdLightMode />
                            </div>
                        </div>
                    </div>
                    <div className='my-5 flex gap-5 items-center w-[70%] mx-auto justify-between'>
                        <h1 className='font-semibold text-sm'>Font-size</h1>
                        <div className='w-[50%] flex justify-center'>
                            <input type='range' ></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralSettings