'use client'

import TextBox from '@/app/components/TextBox'
import React, { useEffect } from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'

import { useState } from 'react'
import { countryCodes, CountryCode } from '@/app/data/country'
import Button from '@/app/components/Button'

function SignUp() {


    const [phone, setPhone] = useState('1234');


    return (
        <div className='flex flex-col h-screen w-full justify-center items-center'>
            <div className='bg-gray-50 shadow-lg  w-[600px] px-20 py-16'>
                <h1 className='font-bold text-3xl my-5'>Sign Up</h1>
                <form action="" method='POST' className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">First Name</label>
                            <TextBox className='!h-10' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Last Name</label>
                            <TextBox className='!h-10' />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Email</label>
                            <TextBox className='!h-10' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Password</label>
                            <TextBox className='!h-10' type='password' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Confirm Password</label>
                            <TextBox className='!h-10' type='password' />
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <label>Role</label>
                        <select name='Role'>
                            <option value="Team Member">Team Member</option>
                            <option value="Project Manager">Project Manager</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="first-name">Phonenumber</label>
                        <div className='flex w-fit bg-red-100'>
                            <select className='w-'>
                                {countryCodes.map((country: CountryCode, index) => (
                                    <option key={index}>{country.dial_code} {country.flag}</option>
                                ))}
                            </select>
                            <TextBox className='!h-10 !flex-grow' />
                        </div>
                    </div>
                    <div className='flex-col space-y-2 my-3 '>
                        <div className='flex gap-4 items-start'>
                            <input type='checkbox' className='my-2'></input>
                            <p className='text-md text-[15px]'>I would like to recieve latest news about Task Mate and any offers the may come in the future.</p>
                        </div>
                        <div className='flex gap-4 items-start'>
                            <input type='checkbox' className='my-2'></input>
                            <p className='text-md text-[15px]'>I agree with the licenses, terms and conditions of this software.</p>
                        </div>
                    </div>
                    <Button label={'Create Account'} />
                </form>
            </div>
        </div>
    )
}

export default SignUp