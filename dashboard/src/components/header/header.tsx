"use client"
import { setIsSidebarOpen } from '@/lib/features/global-slice';
import { RootState } from '@/lib/store';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { HiMenuAlt3, HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector((state: RootState)=> state.global);
  const {data: session} = useSession();

  return (
    <header className="border border-white/40 bg-white bg-opacity-80 h-16 w-full shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] flex flex-col justify-center fixed dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75 z-10">
      <div className="mx-4 md:mx-16 flex justify-between items-center">
        <h1 className="hidden md:block uppercase text-2xl font-bold hover:text-sky-800 dark:hover:text-sky-300 transition"><Link href="/dashboard">Sailors</Link></h1>
        <div className='md:hidden flex justify-end gap-4 mt-3'>
          <button type='button' onClick={()=> dispatch(setIsSidebarOpen(!isSidebarOpen))}>
          <HiOutlineMenuAlt2 />
          </button>
        </div>
        <div className="flex justify-between items-center gap-2">
          <h3>{session?.user.name}</h3>
          <button type="button" onClick={()=> signOut()} >  
            <MdLogout className='hover:text-sky-800 dark:hover:text-sky-300 transition'/>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;