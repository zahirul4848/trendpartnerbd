"use client"
import { decreaseCount, increaseCount, removeFromCart } from '@/lib/features/global-slice';
import { TCart } from '@/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io';
import { TbCurrencyTaka, TbMinus, TbPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

const CartItem = ({item}: {item: TCart}) => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex gap-2 border-b border-gray-300/50 dark:border-gray-900/50"
    >
      <Link href={`/details/${item.slug}`}>
        <Image src={item.image.url} width={500} height={500} alt={item.image.public_id} className="w-20 h-14 rounded hover:opacity-95 dark:hover:opacity-85 transition-opacity" />
      </Link>
      <div className='flex justify-between w-full'>
        <div>
          <Link className="block hover:underline mb-2" href={`/details/${item.slug}`}>{item.productTitle}</Link>
          <div className='inline-flex items-center gap-2 border rounded-lg border-gray-300 dark:border-gray-600 text-sm'>
            <button 
              className='p-2 hover:bg-sky-200 dark:hover:bg-sky-950 rounded-lg transition' 
              type='button'
              onClick={()=> dispatch(decreaseCount({productId: item.productId}))}
            >
              <TbMinus/>
            </button>
            <span>{item.count}</span>
            <button 
              className='p-2 hover:bg-sky-200 dark:hover:bg-sky-950 rounded-lg transition' 
              type='button'
              onClick={()=> dispatch(increaseCount({productId: item.productId}))}
            >
              <TbPlus/>
            </button>
          </div>
        </div>
        <div className="text-right space-y-3">
          <button
            onClick={()=> dispatch(removeFromCart({productId: item.productId}))}
          >
            <IoIosCloseCircle className="text-lg hover:text-red-800 dark:hover:text-red-400 transition" />
          </button>
          <p className="flex items-center"><TbCurrencyTaka/> {item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default CartItem;