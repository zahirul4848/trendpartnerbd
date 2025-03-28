"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { registerSchema, TRegisterSchema } from '@/lib/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '@/lib/features/user-api-slice';
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';



const Register = () => {
  const router = useRouter();
  const { status } = useSession();
  const [signUp] = useRegisterMutation();
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting},
    reset
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const onFormSubmit = async(data: TRegisterSchema)=> {
    try {
      await signUp(data).unwrap();
      toast.success("Sign Up Successfully, please login");
      router.push("/account/login");
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
        <h2 className="text-center text-3xl font-extrabold">Create an account</h2>
        <p className="mt-2 text-center text-sm max-w text-gray-700 dark:text-gray-400">Or <Link href="/account/login" className="font-medium text-blue-600 hover:text-blue-500">Login to your account</Link></p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Full name</label>
              <div className="mt-1">
                <input
                  {...register("name")} 
                  id="name" 
                  name="name" 
                  type="text" 
                  autoComplete="name" 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500">{`${errors.name.message}`}</p>
              )}
            </div>
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
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <div className="mt-1">
                <input
                  {...register("password")} 
                  id="password" 
                  name="password" 
                  type="password" 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmedPassword" className="block text-sm font-medium">Confirm password</label>
              <div className="mt-1">
                <input
                  {...register("confirmPassword")} 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                  placeholder="Enter confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
              )}
            </div>
            <div>
              <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 cursor-pointer">Sign Up</button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button onClick={()=> signIn("google")} type='button' className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-500 dark:hover:border-gray-300 hover:border-gray-400 rounded-md shadow-sm text-sm font-medium transition"><FcGoogle /></button>
            </div>
            <div>
              <button onClick={()=> signIn("facebook")} type='button' className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-500 dark:hover:border-gray-300 hover:border-gray-400 rounded-md shadow-sm text-sm font-medium transition-all"><FaFacebook/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;