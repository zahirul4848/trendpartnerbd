"use client";
import React from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoPersonOutline } from "react-icons/io5";
import { HiMenuAlt3, HiOutlineMoon } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartModalOpen, setIsSidebarOpen } from '@/lib/features/global-slice';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { LINKS } from '@/lib/data/links';
import SearchBox from './search-box';
import { useSession } from 'next-auth/react';
import ProfileDropdown from './profile-dropdown';
import { useTheme } from '@/context/theme-context';
import { BsSun } from 'react-icons/bs';
import clsx from "clsx";
import Image from 'next/image';



const Header = () => {
  const dispatch = useDispatch();
  const { status } = useSession();
  const {isSidebarOpen, isCartModalOpen} = useSelector((state: RootState)=> state.global);
  const {theme, toggleTheme} = useTheme();

  const {cart} = useSelector((state: RootState)=> state.global);

  return (
    <header className="border border-white/40 bg-white/80 h-28 w-full shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] flex flex-col justify-center fixed dark:bg-gray-950/75 dark:border-black/40 z-10">
      <div className="mx-4 md:mx-16 flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2">
        <Link href="/" className="text-sm md:text-xl font-bold hover:text-sky-800 dark:hover:text-sky-300 transition flex items-center gap-0.5">
          <Image
            src={"/logo-thumnail.png"}
            alt='Logo'
            width={256}
            height={256}
            className='w-5 h-5'
          />
          <span>TREND</span><span className='text-orange-500'>Partner BD</span>
        </Link>
        <div className='hidden md:block'>
          <SearchBox/>
        </div>
        <div className="flex justify-between items-center gap-8 text-lg">
          <button
            type='button'
            className="cursor-pointer"
            onClick={toggleTheme}
          >
            {theme === "light" ? <HiOutlineMoon className="hover:text-sky-800 dark:hover:text-sky-300 transition" /> : <BsSun className="hover:text-sky-800 dark:hover:text-sky-300 transition" />}
          </button>
          <Link
            href={status === "authenticated" ? "/account/profile?section=wishlist" : "/account/login"}
          >
            <MdFavoriteBorder className='hover:text-sky-800 dark:hover:text-sky-300 transition' />
          </Link>
          <button 
            type='button' 
            className='relative cursor-pointer'
            onClick={()=> dispatch(setIsCartModalOpen(!isCartModalOpen))}
          >
            <TiShoppingCart className='hover:text-sky-800 dark:hover:text-sky-300 transition' />
            <span className={clsx("absolute top-[-10px] right-[-5px] text-xs text-red-400", {"hidden" : cart.length === 0})}>{cart.length}</span>
          </button>
          {status === "authenticated" ? (
            <ProfileDropdown/>
          ) : (
            <Link className="" href="/account/login"><IoPersonOutline className='hover:text-sky-800 dark:hover:text-sky-300 transition' /></Link>
          )}
        </div>
      </div>
      
      <div className="mx-4 md:mx-16">
        <ul className="hidden md:flex justify-center items-center gap-3 mt-3">
          {LINKS.map((link)=> (
            <li className='uppercase hover:text-sky-800 dark:hover:text-sky-300 transition' key={link.id}><Link href={link.route}>{link.name}</Link></li>
          ))}
        </ul>
        <div className='md:hidden flex justify-end gap-4 mt-3'>

          <SearchBox/>
          <button type='button' onClick={()=> dispatch(setIsSidebarOpen(!isSidebarOpen))}>
            <HiMenuAlt3 />
          </button>
        </div>
        
      </div>
    </header>
  )
}

export default Header;