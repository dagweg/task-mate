'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TextBox from '@/app/components/TextBox';
import Link from 'next/link';
import { Button, Dialog, Flex } from '@radix-ui/themes';


interface PageProps {
  error?: string;
}

const errors: { [key: string]: string } = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

const Login: React.FC<PageProps> = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);

  const [formData, setFormData] = useState({
    email: '',
    passWord: ''
  })

  const [message, setMessage] = useState<string>('')
  const dialogRef = useRef<any>()
  const navigator = useRouter()
  let redirectUrl = 'http://localhost:3000';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl')!;
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
          localStorage.removeItem('userId')
          localStorage.setItem('userId', data.userId)
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
      <div className="relative w-full h-full flex flex-col justify-center items-center p-10">
        <Dialog.Root >
          <Dialog.Trigger>
            <Button ref={dialogRef}></Button>
          </Dialog.Trigger>
          <Dialog.Content style={{ maxWidth: 450 }} className='flex flex-col justify-center items-center '>
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
        <h1 className="text-5xl font-bold tracking-wide py-10">Login</h1>
        <div className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[300px]'>
            <TextBox placeholder="Email" onChange={(e: any) => handleInputChange(e, 'email')} />
            <TextBox placeholder="Password" type='password' onChange={(e: any) => handleInputChange(e, 'passWord')} />
            <input type='submit' value={'Signin'} className='bg-dark1 rounded-sm cursor-pointer text-white py-4 hover:bg-dark2 w-full font-semibold'></input>
            <p>
              New to Task Mate? <Link href="/signup" className='underline font-semibold'>Create Account</Link>
            </p>
          </form>
        </div>
        {errorMessage && (
          <div className="w-full bg-[rgba(255,10,10,.2)] h-40">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default Login;