'use client'

import TextBox from '@/app/components/TextBox'
import React, { useEffect, useRef } from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
// import { countryCodes, CountryCode } from '@/app/data/country'

import { POST } from '@/app/api/route'
import Image from 'next/image'

import { Button, Dialog, Flex, IconButton, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import MessageBox from '@/app/components/MessageBox'
import { FaUserAlt } from "react-icons/fa";
import { cn } from '@/app/lib/utils'

function SignUp() {

    const [countryCode, setCountryCode] = useState([])
    const [message, setMessage] = useState<string>('Account created successfully!');
    const [accountCreated, setAccountCreated] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passWord: '',
        confirmPassWord: '',
        countryCode: '',
        phoneNumber: '',
        licenseAndTerms: false
    });

    const dialogRef = useRef<any>();

    const router = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault()

        fetch('api/addUser/', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })
            .then(async response => {
                const data = await response.json()
                if (response.ok) {
                    console.log('Registerd Successfully')
                    setAccountCreated(true);
                    setMessage('Account created successfully!')
                    dialogRef.current.click()
                } else {
                    console.log(data)
                    setMessage('Account creation failed!')
                    dialogRef.current.click();
                }
            })

        // console.log(formData)

    }

    const handleInputChange = (e: any, field: string) => {
        setFormData((prev: typeof formData) => {
            const updatedFormData = {
                ...prev,
                [field]: e.target.value
            };
            // console.log(updatedFormData);
            return updatedFormData;
        });
    }

    useEffect(() => {
        async function fetchCountryCodes() {
            fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setCountryCode(data)
                })
        }
        fetchCountryCodes()
    }, [])

    const [agreed, setAgreed] = useState<boolean>(false)

    return (
        <div className='flex flex-col h-full w-full justify-center items-center'>
            <Dialog.Root >
                <Dialog.Trigger>
                    <Button ref={dialogRef}></Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ maxWidth: 450 }} className='flex flex-col justify-center items-center '>
                    <Dialog.Title>{message}</Dialog.Title>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Link href={'/login'}><Button className='!bg-gray-300 !text-black hover:!bg-dark2 hover:!text-white ' >Login</Button></Link>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
            <div className='w-[700px] px-20 py-16'>
                <h1 className='font-bold text-5xl my-7 text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">First Name</label>
                            <TextBox className='!h-10' onChange={(e: any) => handleInputChange(e, 'firstName')} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Last Name</label>
                            <TextBox className='!h-10' onChange={(e: any) => handleInputChange(e, 'lastName')} />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Email</label>
                            <TextBox className='!h-10' onChange={(e: any) => handleInputChange(e, 'email')} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Password</label>
                            <TextBox className='!h-10' onChange={(e: any) => handleInputChange(e, 'passWord')} type='password' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Confirm Password</label>
                            <TextBox className='!h-10' onChange={(e: any) => handleInputChange(e, 'confirmPassWord')} type='password' />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="first-name">Phonenumber</label>
                        <div className='flex w-fit bg-red-100'>
                            <select className='w-20' onChange={(e: any) => handleInputChange(e, 'countryCode')}>
                                {countryCode.map((country: any, index) => (
                                    <option key={index}>
                                        <span>
                                            <label>{country.idd.root}{country.idd.suffixes[0]}</label>
                                            {/* <Image src={country.flags.png} alt='' width={10} height={10} objectFit='fit' ></Image> */}
                                        </span>
                                    </option>
                                ))}
                            </select>
                            <TextBox className='!h-10 max-w-2xl !flex-grow' onChange={(e: any) => handleInputChange(e, 'phoneNumber')} />
                        </div>
                    </div>
                    {/* <div className='flex-col space-y-2 my-3 '>
                        <div className='flex gap-4 items-start'>
                            <input type='checkbox' className='my-2' checked={agreed} onChange={() => setAgreed(!agreed)}></input>
                            <p className='text-md text-[15px]'>I agree with the licenses, terms and conditions of this software.</p>
                        </div>
                    </div> */}
                    <input type='submit' value={'Create Account'} className={cn('rounded-md cursor-pointer py-4 my-2 bg-dark1 hover:bg-dark2 text-white')}></input>
                    <p>Already have an account? <span className='font-semibold underline hover: cursor-pointer' onClick={() => router.push('/login')}>Login</span></p>
                </form>
            </div>
        </div >
    )
}

export default SignUp