'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { useParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import TextBox from '@/app/components/TextBox';
import Link from 'next/link';
import { Button, Dialog, Flex } from '@radix-ui/themes';
import { FaGoogle } from 'react-icons/fa';


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

const Page: React.FC<PageProps> = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);

  const [formData, setFormData] = useState({
    email: '',
    passWord: ''
  })

  const [message, setMessage] = useState<string>('')
  const dialogRef = useRef<any>()
  const navigator = useRouter()
  const router = useParams();
  let redirectUrl = 'http://localhost:3000';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl')!;
  }, []);



  const handleLogin = () => {
    signIn();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch('api/login', {
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
          // when its succesful, we store the userId in the local storage...
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
      // console.log(updated)
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
            <TextBox placeholder="Password" onChange={(e: any) => handleInputChange(e, 'passWord')} />
            <input type='submit' value={'Signin'} className='bg-dark1 rounded-sm cursor-pointer text-white py-4 hover:bg-dark2 w-full font-semibold'></input>
            {/* <div className="flex items-center space-x-4">
              <div className="flex-grow h-[1px] bg-black" />
              <p>or</p>
              <div className="flex-grow h-[1px] bg-black" />
            </div> */}
            {/* <div
              className="group flex justify-center items-center  gap-6 bg-white text-black border-black border-2 shadow-lg py-4  px-2 w-full rounded-sm  hover:bg-gray-100  active:scale-105 duration-150 text-xl cursor-pointer "
              onClick={() => {
                signIn('google', {
                  callbackUrl: redirectUrl,
                });
              }}
            >
              <FaGoogle className="scale-150 duration-150 " />
              <label htmlFor="google" className="text-sm duration-150 ">
                Continue with Google
              </label>
            </div>
            <div
              className="group flex justify-center items-center  gap-6 bg-stone-800 text-stone-50 border-black border-2 shadow-lg py-4 px-2 w-full rounded-sm  hover:bg-dark2 active:scale-105 duration-150 text-xl cursor-pointer "
              onClick={() => {
                signIn('github', {
                  callbackUrl: redirectUrl,
                });
              }}
            >
              <FaGithub className="scale-150  group-hover:text-white duration-150 " />
              <label htmlFor="google" className="text-sm group-hover:text-white duration-150 ">
                Continue with Githhub
              </label>
            </div> */}

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

export default Page;