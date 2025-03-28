"use client";
import { RootState } from '@/lib/store';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";
import { setIsSidebarOpen } from '@/lib/features/global-slice';
import { LINKS } from '@/lib/data/links';
import Image from 'next/image';


const Sidenav = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen} = useSelector((state: RootState)=> state.global);
  
  
  const ref = useRef<any>(null);
  // useEffect(() => {
  //   if(!isSidebarOpen) return;
  //   function handleClick(event: MouseEvent) {
  //     if(ref.current && !ref.current.contains(event.target)) {
  //       console.log("You are right");
  //       dispatch(setIsSidebarOpen(false));
  //     }
  //   }    
  //   window.addEventListener("click", handleClick);  
  //   return () => window.removeEventListener("click", handleClick);
  // }, [isSidebarOpen]);

  return (
    <aside className={`md:hidden fixed top-0 left-0 z-40 w-64 h-screen transition-transform ease-in-out duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 relative bg-opacity-90 dark:bg-opacity-95 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem]">
        <button ref={ref} type='button' onClick={()=> dispatch(setIsSidebarOpen(false))} className="absolute right-0 top-0">
          <IoIosCloseCircle size={30} />
        </button>
        <Link href="/" className="text-sm md:text-xl font-bold hover:text-sky-800 dark:hover:text-sky-300 transition flex items-center justify-center gap-0.5 mb-10 border-b pb-5">
          <Image
            src={"/logo-thumnail.png"}
            alt='Logo'
            width={256}
            height={256}
            className='w-5 h-5'
          />
          <span>TREND</span><span className='text-orange-500'>Partner BD</span>
        </Link>
        <ul className="space-y-2">
          {LINKS.map((link)=> (
            <li 
              className='uppercase border-b pb-1' 
              key={link.id}
              onClick={()=> dispatch(setIsSidebarOpen(false))}
            >
              <Link href={link.route}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidenav;


