'use client';
import { useRouter } from 'next/navigation';
import { Form, Formik, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import loginUser from '@/lib/auth';

import { Eye, EyeOff } from 'lucide-react';

import LoginSchema from './LoginSchema';
import { useState } from 'react';

const LoginForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const result = await loginUser(values.email, values.password);

          sessionStorage.setItem('access_token', result.access_token);
          toast.success(`Logged in as ${values.email}`);
          router.push('/');
        } catch (error: unknown) {
          if (error instanceof Error) {
            const authError = error as Error & { code?: string };
            if (authError.code === 'invalid_grant') {
              setFieldError('password', 'Incorrect email or password');
            } else {
              toast.error(authError.message || 'Login failed. Please try again.');
            }
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-2 w-full">
          {/* Email */}
          <div className="relative w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                '!text-sm !placeholder:text-sm',
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black'
              )}
            />

            <div className="relative min-h-[1.25rem]">
              <ErrorMessage
                name="email"
                component="div"
                render={(msg) => <div className="absolute text-xs text-red-600 mt-1">{msg}</div>}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>

            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                '!text-sm !placeholder:text-sm',
                errors.password && touched.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
                'pr-10'
              )}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8.5 text-gray-600 hover:cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <div className="relative min-h-[1.25rem]">
              <ErrorMessage
                name="password"
                component="div"
                render={(msg) => <div className="absolute text-xs text-red-600 mt-1">{msg}</div>}
              />
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>

          <div className="text-center mt-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <a
              href="/register"
              className="underline underline-offset-4 text-black hover:text-neutral-600 transition-colors"
            >
              Create one
            </a>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
