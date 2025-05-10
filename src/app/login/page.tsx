'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';

const Login = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex w-full items-center justify-center px-4 sm:px-4 md:px-8">
      <div className="w-full max-w-lg bg-white px-6 sm:px-12 py-6 sm:py-8 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to StepUp</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
