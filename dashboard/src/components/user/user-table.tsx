import React from 'react';
import { TUser } from '@/lib/types/types';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from '../pagination';


type TUserTable = {
  handleClickDelete: (_id: string)=> void;
  handleClickEdit: (_id: string)=> void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
  users: TUser[];
};

const UserTable = ({users, handleClickDelete, handleClickEdit, totalPage, setCurrentPage, currentPage}: TUserTable) => {
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
              Email
            </th>
            <th scope="col" className="p-4">
              Role
            </th>
            <th scope="col" className="p-4">
              Wishlist
            </th>
            <th scope="col" className="p-4">
              {/* <span className="sr-only">ACTION</span> */}
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=> (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <td className="px-4 py-3 max-w-[5rem] truncate hover:text-clip">
                {user._id}
              </td>
              <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
              </th>
              <td className="px-4 py-3">
                {user.email}
              </td>
              <td className="px-4 py-3">
                {user.role}
              </td>
              <td className="px-4 py-3">
                {user.wishlist?.length || 0}
              </td>
              <td className="px-4 py-3 text-xl">
                <div className="flex gap-5">
                  <button
                    onClick={()=> handleClickEdit(user._id)}
                    className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    <CiEdit/>
                  </button>
                  <button 
                    onClick={()=> handleClickDelete(user._id)} 
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

export default UserTable;