import { TCart } from '@/lib/types/types'
import Image from 'next/image'
import React from 'react'

const OrderItemsTable = ({orderItems}: {orderItems: TCart[]}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right">
      <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
        <tr>
          <th scope="col" className="p-4 w-[6rem]">
            Image
          </th>
          <th scope="col" className="p-4">
            Title
          </th>
          <th scope="col" className="p-4">
            Quantity
          </th>
          <th scope="col" className="p-4">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map((item)=> (
          <tr key={item.productId} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-1 w-[6rem]">
              <Image src={item.image.url} alt={item.image.public_id} width={300} height={300} className="h-[3rem] w-[4rem] object-cover" />
            </td>
            <td className="px-4 py-3 max-w-[5rem] truncate hover:text-clip">
              {item.productTitle}
            </td>
            <th scope="row" className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.count}
            </th>
            <td className="px-4 py-1">
              {item.price}
            </td>
          </tr>        
        ))}
      </tbody>
    </table>
  )
}

export default OrderItemsTable;