'use client'

import TextBox from '@/app/components/TextBox'
import React, { useEffect, useRef } from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { countryCodes, CountryCode } from '@/app/data/country'
import Button from '@/app/components/Button'
import { POST } from '@/app/api/route'

function SignUp() {

    let firstname = useRef<HTMLInputElement>(null);
    let lastname = useRef<HTMLInputElement>(null);
    let email = useRef<HTMLInputElement>(null);
    let password = useRef<HTMLInputElement>(null);
    let confirmpassword = useRef<HTMLInputElement>(null);
    // let role = useRef<HTMLInputElement>(null);
    let phonenumber = useRef<HTMLInputElement>(null);
    let newsletter = useRef<HTMLInputElement>(null);
    let licenseandterms = useRef<HTMLInputElement>(null);

    const [phone, setPhone] = useState('1234');
    const router = useRouter()

    // const createAccount = async () => {
    //     fetch('api/addUser', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "a": "a"
    //         }),
    //     })
    //     //test acc.creation - no input validation !boilerplate

    //     // assuming valid input

    //     // const form = new FormData();
    //     // if (firstname.current)
    //     //     form.append('username', firstname.current.value);
    //     // if (lastname.current)
    //     //     form.append('lastname', lastname.current.value);
    //     // if (email.current)
    //     //     form.append('email', email.current.value);
    //     // if (password.current)
    //     //     form.append('password', password.current.value);
    //     // if (role.current)
    //     //     form.append('role', role.current.value);
    //     // if (phonenumber.current)
    //     //     form.append('phonenumber', phonenumber.current.value);
    //     // if (newsletter.current)
    //     //     form.append('newsletter', newsletter.current.value);
    //     // if (licenseandterms.current)
    //     //     form.append('licenseandterms', licenseandterms.current.value);

    // }

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <div className='w-[700px] px-20 py-16'>
                <h1 className='font-bold text-5xl my-7 text-center'>Sign Up</h1>
                <form action="/api/addUser" method='POST' className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">First Name</label>
                            <TextBox className='!h-10' ref={firstname} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Last Name</label>
                            <TextBox className='!h-10' ref={lastname} />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Email</label>
                            <TextBox className='!h-10' ref={email} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Password</label>
                            <TextBox className='!h-10' type='password' ref={password} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Confirm Password</label>
                            <TextBox className='!h-10' type='password' ref={confirmpassword} />
                        </div>
                    </div>
                    {/* <div className='flex gap-5 items-center'>
                        <label>Role</label>
                        <select name='Role' ref={role as any}>
                            <option value="Team Member">Team Member</option>
                            <option value="Project Manager">Project Manager</option>
                        </select>
                    </div> */}
                    <div className='flex flex-col'>
                        <label htmlFor="first-name">Phonenumber</label>
                        <div className='flex w-fit bg-red-100'>
                            <select className='w-'>
                                {countryCodes.map((country: CountryCode, index) => (
                                    <option key={index}>{country.dial_code} {country.flag}</option>
                                ))}
                            </select>
                            <TextBox className='!h-10 !flex-grow' ref={phonenumber} />
                        </div>
                    </div>
                    <div className='flex-col space-y-2 my-3 '>
                        {/* <div className='flex gap-4 items-start'>
                            <input type='checkbox' className='my-2' ref={newsletter as any}></input>
                            <p className='text-md text-[15px]'>I would like to recieve latest news about Task Mate and any offers the may come in the future.</p>
                        </div> */}
                        <div className='flex gap-4 items-start'>
                            <input type='checkbox' className='my-2' ref={licenseandterms as any}></input>
                            <p className='text-md text-[15px]'>I agree with the licenses, terms and conditions of this software.</p>
                        </div>
                    </div>
                    <input type='submit' value={'Create Account'} className='bg-dark1 rounded-md cursor-pointer text-white py-4 hover:bg-dark2'></input>
                    <p>Already have an account? <span className='font-semibold text-purple-800 cursor-pointer' onClick={() => router.push('/login')}>Login</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp