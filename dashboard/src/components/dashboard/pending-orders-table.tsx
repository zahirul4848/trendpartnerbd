import React from 'react';
import { TOrder } from '@/lib/types/types';
import { MdOutlineFileOpen } from "react-icons/md";
import Link from 'next/link';

type TPendingOrderTable = {
  orders: TOrder[];
};

const PendingOrderTable = ({orders}: TPendingOrderTable) => {
  return (
    <div className="bg-black/10 dark:bg-white/10 rounded-xl p-2 border border-black/20 dark:border-white/20 shadow shadow-black/10 dark:shadow-white/10 relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase">
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
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order)=> (
            <tr key={order._id} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
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
                </div>
              </td>
            </tr>        
          ))}
        </tbody>
      </table>
      <h1 className='text-center mt-2'>Pending Orders</h1>
    </div>
  )
}

export default PendingOrderTable;