'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TextBox from '@/app/components/TextBox';
import Link from 'next/link';
import { Button, Dialog, Flex } from '@radix-ui/themes';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    passWord: ''
  })

  const [message, setMessage] = useState<string>('')
  const dialogRef = useRef<any>()
  const navigator = useRouter()

  const [userId, setUserId] = useState<any>()

  useEffect(() => {
    setUserId(window.localStorage.getItem('userId'))
  }, []);


  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json()

        if (response.ok) {
          console.log('Login successful!')

          if (typeof window !== 'undefined') {
            window.localStorage.removeItem('userId')
            window.localStorage.setItem('userId', data.userId)
          }

          console.log(data.userId)
          navigator.push('/')
        } else {
          console.log('Login, not successful')
          setMessage(prev => data)
          dialogRef.current.click()
        }
        console.log(data)
      })
  }

  const handleInputChange = (e: any, field: string) => {
    setFormData((prev: typeof formData) => {
      const updated = {
        ...prev,
        [field]: e.target.value
      }
      return updated
    })
  }

  return (
    <>
      <Dialog.Root >
        <Dialog.Trigger>
          <Button ref={dialogRef}></Button>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }} className='flex flex-col justify-center items-center !z-[100] relative'>
          <Dialog.Title>{message}</Dialog.Title>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Ok
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <div className="relative mx-auto w-[400px] min-w-fit h-fit min-h-[300px] lg:w-[500px]  border-[1px] shadow-md rounded-md  bg-white bg-opacity-50 backdrop-blur-lg  group/main">
        <div className='bg-slate-400 absolute inset-0 z-[0] scale-[1] scale-x-[1.01] group-hover/main:bg-gray-800    origin-center  rounded-md duration-300'>
        </div>
        <div className='relative w-full min-h-[300px]  bg-white px-16 py-10 flex flex-col md:flex-row items-center justify-center gap-10'>
          <div className='h-full px-2 flex flex-col justify-center'>
            <h1 className="text-5xl tracking-wide  self-start font-bold  inset-0 ">Login </h1>
            <p className='text-center'>To Task Mate</p>

          </div>
          <div className='bg-black h-full w-[1px] bg-opacity-20 '></div>
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[300px]'>
              <TextBox placeholder="Email" onChange={(e: any) => handleInputChange(e, 'email')} className='!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800' />
              <TextBox placeholder="Password" type='password' onChange={(e: any) => handleInputChange(e, 'passWord')} className='!rounded-lg !border-0 focus:!bg-opacity-80 outline-gray-400 outline-offset-[-2px] focus:!outline-gray-800' />
              <input type='submit' value={'Signin'} className='bg-slate-500  cursor-pointer text-white py-3 hover:bg-slate-900 duration-75 transition w-full font-semibold !rounded-lg'></input>

              <p className='text-sm flex gap-2 px-3'>
                New to Task Mate?
                <Link href="/signup" className='font-semibold flex flex-col w-fit group '>
                  Create Account
                  <span className='scale-x-0 duration-100 origin-center bg-black h-[2px] group-hover:scale-x-100'></span>
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;