"use client"
import { useForgotPasswordMutation } from '@/lib/features/user-api-slice';
import { forgetPasswordSchema, TForgetPasswordSchema } from '@/lib/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const { status } = useSession();
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting},
  } = useForm<TForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema)
  });

  const onFormSubmit = async(data: TForgetPasswordSchema)=> {
    try {
      const response = await forgotPassword(data).unwrap();
      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(()=> {
    if(status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-2 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold">Forgot Your Password?</h2>
        <p className="mt-2 text-center text-sm max-w text-gray-700 dark:text-gray-400">Or <Link href="/account/login" className="font-medium text-blue-600 hover:text-blue-500">return to login</Link></p>
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
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
              )}
            </div>
            <div>
              <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all cursor-pointer">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;