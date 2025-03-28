"use client";
import { RootState } from '@/lib/store';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";
import { setIsSidebarOpen } from '@/lib/features/global-slice';
import { LINKS } from '@/lib/data/links';
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const {isSidebarOpen} = useSelector((state: RootState)=> state.global);
  
  const ref = useRef<any>(null);
  
  return (
    <aside className={`fixed top-0 left-0 z-40 md:z-0 w-64 h-screen transition-transform ease-in-out duration-300 md:translate-x-0 ${!isSidebarOpen && "-translate-x-full md:translate-x-0"}`}>
      <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-950 dark:border-gray-700 relative">
        <button ref={ref} type='button' onClick={()=> dispatch(setIsSidebarOpen(!isSidebarOpen))} className="md:hidden absolute right-0 top-0">
          <IoIosCloseCircle size={30} />
        </button>
        <h1 className="uppercase text-2xl font-bold mb-10 text-center border-b pb-5 md:pb-2"><Link href="/">Sailors</Link></h1>
        <ul className="space-y-3 ml-12">
          {LINKS.map((link)=> (
            <li 
              className={`rounded-lg px-2 py-1 hover:bg-gray-300 hover:text-sky-800 dark:hover:bg-gray-700 dark:hover:text-sky-300 transition-colors ${pathname === (link.route) && "bg-gray-300 dark:bg-gray-700"}`} 
              key={link.id}
              onClick={()=> dispatch(setIsSidebarOpen(!isSidebarOpen))}
            >
              <Link className="flex items-center gap-2" href={link.route}>
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar;


