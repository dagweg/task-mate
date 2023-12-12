'use client'

import React, { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import TextBox from '@/app/components/TextBox';
import Link from 'next/link';

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

  const router = useParams();
  let redirectUrl = 'http://location:3000';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl')!;
  }, []);

  const handleLogin = () => {
    signIn();
  };

  return (
    <>
      <div className="relative w-full h-full flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold tracking-wide py-10">Login</h1>
        <div className="flex flex-col gap-2">
          <TextBox placeholder="Email" />
          <TextBox placeholder="Password" />
          <div className="flex items-center space-x-4">
            <div className="flex-grow h-[1px] bg-black" />
            <p>or</p>
            <div className="flex-grow h-[1px] bg-black" />
          </div>
          <div
            className="group flex items-center justify-start gap-6 bg-stone-800 text-stone-50 border-black border-2 shadow-lg p-5 px-16 hover:bg-dark2 active:scale-105 duration-150 text-xl cursor-pointer"
            onClick={() => {
              signIn('github', {
                callbackUrl: redirectUrl,
              });
            }}
          >
            <FaGithub className="scale-150  group-hover:text-white duration-150 " />
            <label htmlFor="google" className="group-hover:text-white duration-150">
              Continue with Githhub
            </label>
          </div>
          <p>
            New to Task Mate? <Link href="/signup">Create Account</Link>
          </p>
        </div>
        {errorMessage && (
          <div className="w-full bg-[rgba(255,10,10,.2)] h-40">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default Page;