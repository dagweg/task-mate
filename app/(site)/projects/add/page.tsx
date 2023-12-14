'use client'

import ButtonRound from '@/app/components/ButtonRound'
import Panel from '@/app/components/Panel'
import TextBox from '@/app/components/TextBox'
import React from 'react'
import { BsInfoSquare } from 'react-icons/bs'

function AddProject() {
    return (
        <div>
            <div className='w-[650px] mx-auto h-fit relative rounded-2xl space-y-20 gap-20 px-16 max-w-7xl items-center'>
                <div className='flex flex-col gap-4 '>
                    <TextBox label='Project Name' />
                    <div className='text-field flex flex-col'>
                        <label htmlFor="">Project Description</label>
                        <textarea name="" id="" rows={30} className='outline-none border border-black h-28  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4'></textarea>
                    </div>
                </div>
                <div className='flex flex-col gap-10 justify-center'>
                    <div>
                        <h1 className='font-semibold'>Add team members</h1>
                        <div className='flex flex-col gap-3 justify-center my-2'>
                            <div className='flex gap-4 items-center'>
                                <BsInfoSquare />
                                <p className='text-sm'>To add email, just write them separated by commas.</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <BsInfoSquare />
                                <p className='text-sm'>Don`t worry you can edit them later.</p>
                            </div>
                        </div>
                        <TextBox />
                        {/** Test added email*/}
                        <div className='flex overflow-x-scroll'>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>dagtef@gmail.com</div>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>wegd42@gmail.com</div>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>wegd42@gmail.com</div>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>dagtef@gmail.com</div>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>wegd42@gmail.com</div>
                            <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>wegd42@gmail.com</div>
                        </div>
                    </div>

                    <div className='flex justify-end items-center'>
                        <ButtonRound label='Create Project' className='!px-10' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject


{/* <div>
                        <h1 className='font-semibold'>Add Stakeholders</h1>
                        <div className='flex flex-col gap-3 justify-center my-2'>
                            <div className='flex gap-4 items-center'>
                                <BsInfoSquare />
                                <p className='text-sm'>To add email, just write them separated by commas.</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <BsInfoSquare />
                                <p className='text-sm'>Don`t worry you can edit them later.</p>
                            </div>
                        </div>
                        <TextBox />

                        <div className='flex overflow-x-scroll'>
                            <Panel text={'dagtef@gmail.com'} />
                            <Panel text={'dagtef2@gmail.com'} />
                            <Panel text={'wegtef2@gmail.com'} />
                            <Panel text={'wegtef2@gmail.com'} />
                            <Panel text={'wegtef2@gmail.com'} />
                        </div>
                    </div> */}
