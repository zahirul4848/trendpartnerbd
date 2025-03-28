import useProfile from '@/lib/hooks/manage-profile';
import React from 'react'
import Loading from '../loading';
import Link from 'next/link';
import Image from 'next/image';
import { TbCurrencyTaka } from 'react-icons/tb';

const ProfileOrders = () => {
  const {orders, isLoadingOrders} = useProfile();
  return (
    <div className='mx-auto w-full md:w-[70%]'>
      {isLoadingOrders ? <Loading/> : orders?.length === 0 ? (
        <p>You have no previous orders!</p>
      ) : (
        orders?.map(order => (
          <div key={order._id} className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all mb-4 rounded-md px-4 py-2 hover:shadow-sm'>
            <div className='mb-1 flex justify-between items-center border-b border-gray-400 dark:border-gray-600'>
              <div>
                <h1>Order No# {order.orderNumber}</h1>
                <span className='text-xs text-gray-500'>Order placed on: {new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <span className='text-xs text-gray-500'>Order status: <span className='text-center bg-sky-400 text-gray-950 px-4 py-1 rounded-md text-xs'>{order.orderActions[order.orderActions.length - 1].title}</span></span>
            </div>
            <div className="flex gap-3">
              <Image src={order.orderItems[0].image.url} alt={order.orderItems[0].image.public_id} className='w-[4rem] h-[3rem]' width={500} height={500} />
              <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-1'>
                  <h1>{order.orderItems[0].productTitle}</h1>
                  <span className='text-xs text-gray-500 flex items-center'>{order.orderItems.length} item(s), <TbCurrencyTaka/> {order.totalPrice}</span>
                </div>
                <Link href={`/order/${order._id}`} className='p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md flex items-center justify-center'>View</Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ProfileOrders;