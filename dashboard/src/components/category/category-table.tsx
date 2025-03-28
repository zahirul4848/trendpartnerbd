import React from 'react';
import { TCategory } from '@/lib/types/types';
import Image from 'next/image';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from '../pagination';

type TCategoryTable = {
  handleClickDelete: (_id: string)=> void;
  handleClickEdit: (_id: string)=> void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
  categories: TCategory[];
};

const CategoryTable = ({categories, handleClickDelete, handleClickEdit, totalPage, setCurrentPage, currentPage}: TCategoryTable) => {
  return (
    <div className="relative overflow-x-auto shadow-md dark:shadow-gray-700 sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr>
            <th scope="col" className="p-4">
              ID.
            </th>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="p-4">
              Image Url
            </th>
            <th scope="col" className="p-4">
              Image
            </th>
            <th scope="col" className="p-4">
              {/* <span className="sr-only">ACTION</span> */}
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category)=> (
            <tr key={category._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <td className="px-4 py-3 max-w-[5rem] truncate hover:text-clip">
                {category._id}
              </td>
              <th scope="row" className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.name}
              </th>
              <td className="px-4 py-1">
                {category.imageUrl.public_id}
              </td>
              <td className="px-4 py-1">
                <Image src={category.imageUrl.url} alt={category.name} width={300} height={300} className="h-[5rem] w-[7rem] object-cover" />
              </td>
              <td className="px-4 py-1 text-xl">
                <div className="flex gap-5">
                  <button
                    onClick={()=> handleClickEdit(category._id)}
                    className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    <CiEdit/>
                  </button>
                  <button 
                    onClick={()=> handleClickDelete(category._id)} 
                    className='hover:text-red-700 dark:hover:text-red-400 transition-colors'
                  >
                    <MdDeleteOutline/>
                  </button>
                </div>
              </td>
            </tr>        
          ))}
        </tbody>
      </table>
      <div className="my-4">
        <Pagination totalCount={totalPage} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>

  )
}

export default CategoryTable;