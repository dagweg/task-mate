import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'


interface Props {
    message: string,
    type?: number,
    icon?: any,
    href?: string
}

function MessageBox({ message, type = 0, icon, href = '#', }: Props) {
    return (
        <div className='fixed bg-slate-400 w-full h-full bg-opacity-40 flex justify-center items-center backdrop-blur-[4px]'>
            <div className='w-[400px] h-[300px] bg-slate-400 rounded-lg p-10 '>
                <div className='flex  flex-col items-center  justify-center'>
                    {icon}
                    <h1 className='text-2xl font-bold text-white text-center'>{message}</h1>
                </div>
                <div className=' gap-2 my-8'>
                    {
                        type == 0 ?
                            <Link href={href}>
                                <Button className='!w-full  !bg-slate-200 !py-4 !rounded-full hover:!bg-slate-300 duration-75 !cursor-pointer !font-semibold'>Login</Button>
                            </Link>
                            :
                            type == 1 ?
                                <>
                                    <div className='flex'>
                                        <Button className='w-40  !bg-slate-200 !py-4 !rounded-full hover:!bg-slate-300 duration-75 !cursor-pointer !font-semibold'>Yes</Button>
                                        <Button className='w-40  !bg-slate-200 !py-4 !rounded-full hover:!bg-slate-300 duration-75 !cursor-pointer !font-semibold'>No</Button>
                                    </div>
                                </>
                                :
                                type == 2 ?
                                    <>
                                        <div className='flex'>
                                            <Button className='w-40  !bg-slate-200 !py-4 !rounded-full hover:!bg-slate-300 duration-75 !cursor-pointer !font-semibold'>Ok</Button>
                                        </div>
                                    </>
                                    :
                                    <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageBox