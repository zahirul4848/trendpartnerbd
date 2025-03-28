"use client"
import React from 'react';
import { TOrder } from '@/lib/types/types';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineFileOpen } from "react-icons/md";
import Pagination from '../pagination';
import Link from 'next/link';

type TOrderTable = {
  handleClickDelete: (_id: string)=> void;
  handleClickEdit: (_id: string)=> void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
  orders: TOrder[];
};

const OrderTable = ({orders, handleClickDelete, handleClickEdit, currentPage, totalPage, setCurrentPage}: TOrderTable) => {
  return (
    <div className="relative overflow-x-auto shadow-md dark:shadow-gray-700 sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr>
            <th scope="col" className="p-4">
              NO.
            </th>
            <th scope="col" className="p-4">
              Date
            </th>
            <th scope="col" className="p-4">
              Price
            </th>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="p-4">
              User
            </th>
            <th scope="col" className="p-4">
              Status
            </th>
            <th scope="col" className="p-4">
              {/* <span className="sr-only">ACTION</span> */}
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order)=> (
            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <td className="px-4 py-3 max-w-[5rem] truncate hover:text-clip">
                {order.orderNumber}
              </td>
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.createdAt.toString().substring(0, 10)}
              </th>
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.itemsPrice}
              </th>
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.shippingAddress.fullName}
              </th>
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.user ? "YES" : "NO"}
              </th>
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.orderActions[0]?.title || ""}
              </th>
              
              {/* <td className="px-4 py-1">
                <Image src={product.imageUrls[0].url} alt={product.title} width={300} height={300} className="h-[5rem] w-[7rem] object-cover" />
              </td> */}
              <td className="px-4 py-2 text-xl">
                <div className="flex gap-5">
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    <MdOutlineFileOpen />
                  </Link>
                  <button
                    onClick={()=> handleClickEdit(order._id)}
                    className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    <CiEdit/>
                  </button>
                  <button 
                    onClick={()=> handleClickDelete(order._id)} 
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

export default OrderTable;