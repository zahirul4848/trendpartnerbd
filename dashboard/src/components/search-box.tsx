"use client"
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';

type TSearchBox = {
  searchLabel: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}


const SearchBox = ({setSearchQuery, searchLabel}: TSearchBox) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    setSearchQuery(value);
  }

  return (
    <form onSubmit={handleSubmit} className='mb-2 w-80 relative'>
      <input 
        className="rounded-lg pl-5 pr-11 py-2 w-full outline-none bg-gray-200 dark:bg-gray-700" 
        type='text' 
        placeholder={searchLabel}
        onChange={(e)=> setValue(e.target.value)}
      />
      <button type='submit' className="absolute right-2 top-[2px] border-l border-l-gray-50 dark:border-l-gray-500 p-2 cursor-pointer hover:text-sky-800 dark:hover:text-sky-300">
        <IoSearchOutline size={20} />
      </button>
    </form>
  )
}

export default SearchBox;