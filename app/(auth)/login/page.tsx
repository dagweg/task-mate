
// import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 justify-center items-center text-stone-800 px-4 md:px-10 md:py-24 lg:px-24'>
            <div className="flex flex-row gap-4 w-full  bg-transparent">
                <div className="title w-full py-2 text-center text-xl md:text-4xl font-semibold">Log into your account</div>
            </div>

            <form action="" className='w-full flex flex-col gap-6 justify-center items-center'>
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email" placeholder='amanapps.inc@gmail.com'
                    className='w-[80%] py-3 border-stone-500 outline-1 rounded-sm bg-stone-50'
                />
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" placeholder='your password'
                    className='w-[80%] py-3 border-stone-500 outline-1 rounded-sm  bg-stone-50'
                />

                <div className="sumbit py-3 flex w-full justify-center text-stone-400" >
                    <button className="w-[60%] bg-stone-800 py-4 px-2">login</button>
                </div>

                <div className="providers relative flex flex-row gap-4 border-t-8 w-full py-4 ">
                    <p className="p absolute top-0 left-1/2 -translate-x-1/2 py-4 px-1 bg-white">or</p>
                    <button className="google w-[60%] py-4 px-2 ">signIn with  </button>
                </div>

            </form>
        </div>
    )
}

export default page