'use client'

import React from 'react'
import { BsInfoSquare } from 'react-icons/bs'

function AddProject() {
    return (
        <div>
            <div className='bg-white w-full h-screen relative rounded-2xl shadow-lg p-10 mx-auto grid grid-cols-2 gap-20 px-52'>
                <div className='flex flex-col gap-4'>
                    <div className='text-field flex flex-col'>
                        <label htmlFor="">Project Name</label>
                        <input type="text" name="" id="" className='outline-none border border-black  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4' />
                    </div>
                    <div className='text-field flex flex-col'>
                        <label htmlFor="">Project Description</label>
                        <textarea name="" id="" cols={30} rows={30} className='outline-none border border-black  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4'></textarea>
                    </div>
                </div>
                <div className='flex flex-col gap-16 justify-between'>
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
                        <input type="text" name="" id="" className='outline-none border border-black  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4' />

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
                    <div>
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
                        <input type="text" name="" id="" className='outline-none border border-black  p-3 border-b-2 border-[#2226] rounded-sm focus:border-dark2 focus:bg-gray-100 w-[100%] focus:border-b-4' />

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
                        <div className='h-12 w-[65%]  flex justify-center items-center text-xl text-black  outline outline-dark2 outline-2 hover:bg-dark2 hover:text-white hover:font-black cursor-pointer duration-150 linear active:scale-95'>
                            Finish
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject