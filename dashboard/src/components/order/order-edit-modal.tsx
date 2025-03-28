"use client"
import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { orderActionBodySchema, productSchema, TOrderActionBody, TProductSchema } from '@/lib/types/types';
import {motion} from "framer-motion";
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import { useGetProductQuery, useUpdateProductMutation } from '@/lib/features/product-api-slice';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useGetOrderQuery, useUpdateOrderActionMutation } from '@/lib/features/order-api-slice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type TOrderEdit = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  id: string;
}

const OrderEditModal = ({setRequestRefetch, setShowEditModal, showEditModal, id}: TOrderEdit) => {
  const [updateOrderAction] = useUpdateOrderActionMutation();
  const {data: order, isLoading} = useGetOrderQuery(id);
  
  const {
    register, 
    handleSubmit, 
    formState: {errors, isSubmitting},
  } = useForm<TOrderActionBody>({
    resolver: zodResolver(orderActionBodySchema)
  });

  const onFormSubmit = async(data: TOrderActionBody)=> {
    try {
      const response = await updateOrderAction({id, data}).unwrap();
      toast.success(response.message);
      setRequestRefetch(true);
      setShowEditModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>      
      {showEditModal ? (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: 100, opacity: 0}}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full outline-none focus:outline-none bg-gray-600 bg-opacity-20"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 shadow p-2 md:p-4">
              <button 
                type="button"
                onClick={()=> setShowEditModal(false)}
                className="absolute right-0 top-0"
              >
                <IoMdCloseCircle className="hover:text-red-700 text-xl hover:scale-105 transition-all" />
              </button>
              
              {isLoading && <Loading/>}
              {order && (
                <form 
                  className="space-y-6 mt-4"
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <div>
                    <label className="block text-sm font-medium">Select Action</label>
                    <div className="mt-1">
                      <select
                        {...register("title")}
                        className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Not Respond">Not Respond</option>
                        <option value="Paid">Paid</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    {errors.title && (
                      <p className="text-red-500">{`${errors.title.message}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <div className="mt-1">
                      <textarea
                        {...register('description')}
                        id='description'
                        name='description'
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter description"
                      />
                    </div>
                    {errors.description && (
                      <p className="text-red-500">{`${errors.description.message}`}</p>
                    )}
                  </div>
                  <div>
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all"
                    >
                      Update Order
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </motion.div> 
      ) : null}     
    </>
  )
}

export default OrderEditModal;