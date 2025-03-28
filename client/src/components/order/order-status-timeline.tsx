import { TOrderAction } from '@/lib/types/types';
import React from 'react'


const OrderStatusTimeline = ({orderActions} : {orderActions: TOrderAction[]}) => {
  return (   
    <ol className="relative border-s border-gray-300 dark:border-gray-700">
      {orderActions.length > 0 && orderActions.map((orderAction)=> (
        <li key={orderAction._id} className="mb-5 ms-4">
          <div className="absolute w-3 h-3 bg-sky-400 rounded-full mt-1.5 -start-1.5 border border-gray-700 dark:border-gray-200 dark:bg-sky-700"></div>
          <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{new Date(orderAction.createdAt).toISOString().split("T")[0].split("-").reverse().join("-")}</time>
          <h3 className="font-semibold text-gray-900 dark:text-white">{orderAction.title}</h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{orderAction.description}</p>
        </li>
      ))}
    </ol>
  )
}

export default OrderStatusTimeline;