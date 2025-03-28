"use client"
import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, TReviewSchema } from '@/lib/types/types';
import {motion} from "framer-motion";
import { useCreateReviewMutation } from '@/lib/features/product-api-slice';

type TReviewCreateModal = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}


const ReviewCreateModal = ({setRequestRefetch, id}: TReviewCreateModal) => {
  const [showModal, setShowModal] = useState(false);
  const [createReview] = useCreateReviewMutation();

  const {
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema)
  });

  const onFormSubmit = async(data: TReviewSchema)=> {
    try {
      const response = await createReview({id, data}).unwrap();
      toast.success(response.message);
      setRequestRefetch(true);
      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);      
    }
  }

  return (
    <>
      <button 
        className="underline text-blue-900 dark:text-blue-300 hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
        type='button'
        onClick={()=> setShowModal(true)}
      >
        Write a review
      </button>
      
      {showModal ? (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: 100, opacity: 0}}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full outline-none focus:outline-none bg-gray-600/80"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 shadow p-2 md:p-4">
              <button 
                type="button"
                onClick={()=> setShowModal(false)}
                className="absolute right-0 top-0"
              >
                <IoMdCloseCircle className="hover:text-red-700 text-xl hover:scale-105 transition-all" />
              </button>
                            
              <form className="space-y-6 mt-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">Select Rating</label>
                  <div className="mt-1">
                    <select
                      {...register("rating")}
                      className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                    >
                      <option value={1}>1- Poor</option>
                      <option value={2}>2- Fair</option>
                      <option value={3}>3- Good</option>
                      <option value={4}>4- Very Good</option>
                      <option value={5}>5- Excelent</option>
                    </select>
                  </div>
                  {errors.rating && (
                    <p className="text-red-500">{`${errors.rating.message}`}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Comment</label>
                  <div className="mt-1">
                    <textarea
                      {...register("comment")}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Enter product description"
                      rows={5}
                    />
                  </div>
                  {errors.comment && (
                    <p className="text-red-500">{`${errors.comment.message}`}</p>
                  )}
                </div>                
                <div>
                  <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </motion.div> 

      ) : null}     
    </>
  )
}

export default ReviewCreateModal;