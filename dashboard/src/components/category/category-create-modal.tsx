"use client"
import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { useCreateCategoryMutation } from '@/lib/features/category-api-slice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, TCategorySchema } from '@/lib/types/types';
import CreateButton from '../create-button';
import {motion} from "framer-motion";
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const CategoryCreateModal = ({setRequestRefetch}: {setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const session = useSession();
  const [file, setFile] = useState<FileList[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [createCategory] = useCreateCategoryMutation();

  const {
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema)
  });

  const onFormSubmit = async(data: TCategorySchema)=> {
    if(file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const {data: uploadData} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/upload/categoryUpload`, formData, {headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.data?.user.token}`
        }})
        if(uploadData) {
          const response = await createCategory({name: data.name, imageUrl: uploadData});
          toast.success(response.data.message);
          setRequestRefetch(true);
          setShowModal(false);
        } else {
          toast.error("Upload not completed");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    } else {
      toast.error("Please select an Image");
    }
  }

  return (
    <>
      <CreateButton openModal={()=> setShowModal(true)} title="Add Category" />
      
      {showModal ? (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          // exit={{ y: 100, opacity: 0}}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full outline-none focus:outline-none bg-gray-600 bg-opacity-20"
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
                  <label htmlFor="name" className="block text-sm font-medium">Category Title</label>
                  <div className="mt-1">
                    <input
                      {...register("name")}
                      id="name" 
                      name="name" 
                      type="text" 
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Enter category title"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500">{`${errors.name.message}`}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium">Select Image</label>
                  <div className="mt-1">
                    <input
                      // {...register("image")}
                      id="image" 
                      name="image" 
                      type="file"
                      required
                      onChange={(e)=> {
                        if (!e.target.files) return;
                        setFile(e.target.files[0])
                      }}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Upload Image"
                    />
                  </div>
                </div>
                <div>
                  {file && (
                    <Image src={URL.createObjectURL(file)} className="w-[12rem] h-[10rem] my-4 object-cover" width={1024} height={1024} alt='Preview' />
                  )}
                </div>
                <div>
                  <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all">Add New Category</button>
                </div>
              </form>
            </div>
          </div>
        </motion.div> 

      ) : null}     
    </>
  )
}

export default CategoryCreateModal;