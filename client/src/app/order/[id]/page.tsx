"use client"
import Loading from '@/components/loading';
import OrderItemsTable from '@/components/order/order-items-table';
import OrderStatusTimeline from '@/components/order/order-status-timeline';
import { useGetOrderQuery } from '@/lib/features/order-api-slice';
import { useParams } from 'next/navigation';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';

const OrderDetails = () => {
  const {id} = useParams<{id: string}>();
  const {data: order, isLoading} = useGetOrderQuery(id);
  return (
    <main className="min-h-screen mx-4 md:mx-16 my-2">
      <h1 className="text-3xl mb-4">Order Details</h1>
      {isLoading && (
        <Loading/>
      )}
      {order && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="w-full bg-black/5 dark:bg-white/5 rounded p-2 md:p-4 col-span-full md:col-span-3">
            <h2 className="text-xl text-center font-semibold">Order Information # {order.orderNumber}</h2>
            <div className="flex justify-center mb-4">
              <span className='text-center bg-sky-400 text-gray-950 px-4 py-1 rounded-md text-xs'>{order.orderActions[0].title}</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div>
                <h3 className="font-semibold mb-4">Shipping Address</h3>
                <p className="italic">{order.shippingAddress.fullName} <br/> {order.shippingAddress.address} <br /> {order.shippingAddress.email} <br/> {order.shippingAddress.mobile}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className='flex justify-between'>
                  <p>Items Price</p>
                  <p className="flex items-center"><TbCurrencyTaka />{order.itemsPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Shipping Rate</p>
                  <p className="flex items-center"><TbCurrencyTaka />{order.shippingPrice}</p>
                </div>
                <div className='border-b border-gray-200 dark:border-gray-800 my-4' />
                <div className='flex justify-between font-bold'>
                  <p>Total</p>
                  <p className="flex items-center"><TbCurrencyTaka />{order.totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="my-8">
              <h3 className='font-semibold mb-2'>Products</h3>
              <OrderItemsTable orderItems={order.orderItems} />
            </div>
          </div>
          <div className="w-full bg-black/5 dark:bg-white/5 rounded p-2 md:p-4 col-span-full md:col-span-2">
            <OrderStatusTimeline orderActions={order.orderActions} />
          </div>
        </div>
      )}
    </main>
  )
}

export default OrderDetails;