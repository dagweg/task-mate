'use client'

import TextBox from '@/app/components/TextBox'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import Link from 'next/link'
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

        if (formData.passWord !== formData.confirmPassWord) {
            setMessage("Passwords don't match. Please try again!")
            dialogRef.current.click();
            return
        }


        fetch('/api/addUser/', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })
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

    }

    const handleInputChange = (e: any, field: string) => {
        setFormData((prev: typeof formData) => {
            const updatedFormData = {
                ...prev,
                [field]: e.target.value
            };
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
                            {
                                accountCreated ?
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                    :
                                    <Button variant="soft" color="gray">
                                        Ok
                                    </Button>
                            }
                        </Dialog.Close>
                        {
                            accountCreated && <Link href={'/login'}><Button className='!bg-gray-300 !text-black hover:!bg-dark2 hover:!text-white ' >Login</Button></Link>
                        }
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
            <div className='w-[350px] lg:w-[700px] px-16 py-10 border-[1px] shadow-sm rounded-md  bg-white bg-opacity-50 backdrop-blur-lg'>
                <h1 className='font-bold text-5xl my-0 text-center py-2'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
                    <div className='grid lg:grid-cols-2 gap-1'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">First Name</label>
                            <TextBox className='!rounded-full !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10' onChange={(e: any) => handleInputChange(e, 'firstName')} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Last Name</label>
                            <TextBox className='!rounded-full !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10' onChange={(e: any) => handleInputChange(e, 'lastName')} />
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Email</label>
                            <TextBox className='!rounded-full !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10' onChange={(e: any) => handleInputChange(e, 'email')} />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Password</label>
                            <TextBox className='!rounded-full !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10' onChange={(e: any) => handleInputChange(e, 'passWord')} type='password' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="first-name">Confirm Password</label>
                            <TextBox className='!rounded-full !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800 !h-10' onChange={(e: any) => handleInputChange(e, 'confirmPassWord')} type='password' />
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

                    <input type='submit' value={'Create Account'} className={cn('bg-slate-500  cursor-pointer text-white py-3 hover:bg-slate-900 duration-75 transition w-full font-semibold !rounded-full my-2 max-w-[300px]')}></input>
                    <p className='flex gap-2'>Already have an account?
                        <Link href="/login" className='font-semibold flex flex-col w-fit group '>
                            Signin
                            <span className='scale-x-0 duration-100 origin-center bg-black h-[2px] group-hover:scale-x-100'></span>
                        </Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

export default SignUp