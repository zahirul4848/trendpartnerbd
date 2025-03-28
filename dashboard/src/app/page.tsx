"use client";
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { loginSchema, TLoginSchema } from '@/lib/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';


const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting},
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onFormSubmit = async(data: TLoginSchema)=> {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if(result?.ok) {
        router.push("/dashboard");
      } else {
        toast.error("Invalid User or Password");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(()=> {
    if(status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-2 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold">SAILORS</h2>
        <p className="mt-2 text-center text-sm max-w text-gray-700 dark:text-gray-400">Sign in to your account</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
            <div className="mt-1">
              <input
                {...register("email")}
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="mt-1">
              <input
                {...register("password")} 
                id="password" 
                name="password" 
                type="password" 
                className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                placeholder="Enter password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>
          <div>
            <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login;