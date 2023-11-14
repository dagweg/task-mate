import Profile from '@/app/components/Profile'
import React from 'react'

function AboutUs() {

    const devs = [
        "Amanuel Garomsa",
        "Dagmawi Wegayehu",
        "Ashenafi Dejene",
        "Bisrat Tewodros",
        "Etenesh Gishamo",
        "Elshaday Dagne",
        "Abraham Asmamaw",
        "Eden Lijalem",
        "Heni Abreham",
        "Tsedenia"
    ]

    return (
        <div>
            <div className='p-5 flex flex-col gap-5'>
                <h1 className='font-bold text-2xl '>About us.</h1>
                <div className='flex flex-col gap-3'>
                    <div className='bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out'>
                        <div>
                            <p>We are a group of Computer Science students from Addis Ababa University. Our current objective is to successfully ship a product that seamlessly aids team collaboration and project development.</p>
                            <div className='my-5'>
                                <p className='text-lg font-semibold my-2'>Who made the software?</p>
                                <div className='bg-gray-50 w-full h-fit grid grid-cols-4 gap-5 p-4'>
                                    {devs.map((uname, i) => (
                                        <Profile username={uname} key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-fit mx-auto'>
                    <div className='my-20  p-16 rounded-xl w-fit bg-gray-200'>
                        <h1 className='font-bold text-2xl'>Subscribe to our newsletter</h1>
                        <div className='flex gap-2 my-4'>
                            <input className='w-64 p-3 rounded-lg text-white outline-none outline  focus:outline focus:outline-gray-500 outline-2 shadow-md' placeholder='email address'></input>
                            <button className='w-64 p-3 rounded-lg text-white bg-gray-400 hover:bg-dark2 duration-200 hover:text-white outline-none shadow-md active:scale-105' >Submit</button>
                        </div>
                    </div>
                    <div className='my-20 flex flex-col items-center justify-center'>
                        <h1 className='font-bold text-2xl my-3'>Contact us</h1>
                        <div className='flex gap-12 my-4'>
                            <i className='text-5xl fa-brands fa-instagram hover:scale-110 duration-150 ease-in-out cursor-pointer'></i>
                            <i className='text-5xl fa-brands fa-twitter hover:scale-110 duration-150 ease-in-out cursor-pointer'></i>
                            <i className='text-5xl fa-brands fa-telegram hover:scale-110 duration-150 ease-in-out cursor-pointer'></i>
                            <i className='text-5xl fa-brands fa-facebook hover:scale-110 duration-150 ease-in-out cursor-pointer'></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs