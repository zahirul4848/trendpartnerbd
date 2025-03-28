"use client"
import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { useGetAllCategoriesQuery } from '@/lib/features/category-api-slice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, TProductSchema } from '@/lib/types/types';
import CreateButton from '../create-button';
import {motion} from "framer-motion";
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import { useCreateProductMutation } from '@/lib/features/product-api-slice';


const ProductCreateModal = ({setRequestRefetch}: {setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const session = useSession();
  const [files, setFiles] = useState<FileList | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const {data: categoriesData, isLoading: loadingCategory, refetch: refetchCategory} = useGetAllCategoriesQuery({});
  const {
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema)
  });

  const onFormSubmit = async(data: TProductSchema)=> {
    if(!files) {
      toast.error("Images are required to upload");
      return;
    }
    if(files.length > 4) {
      toast.error("Only 4 images are allowed to upload");
      return;
    }

    let formData = new FormData();
    Array.from(files).forEach((file)=> {
      formData.append("images", file);
    });
    try {
      const {data: uploadData} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/upload/productUpload`, formData, {headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.data?.user.token}`
      }})
      if(uploadData) {
        const response = await createProduct({...data, imageUrls: uploadData});
        toast.success(response.data.message);
        setRequestRefetch(true);
        setShowModal(false);
      } else {
        toast.error("Upload not completed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  }

  useEffect(() => {
    refetchCategory();
  }, [])

  return (
    <>
      <CreateButton openModal={()=> setShowModal(true)} title="Add Product" />
      
      {showModal ? (
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
                onClick={()=> setShowModal(false)}
                className="absolute right-0 top-0"
              >
                <IoMdCloseCircle className="hover:text-red-700 text-xl hover:scale-105 transition-all" />
              </button>
                            
              <form className="space-y-6 mt-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                  <label className="block text-sm font-medium">Product Title</label>
                  <div className="mt-1">
                    <input
                      {...register("title")}
                      type="text" 
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Enter product title"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500">{`${errors.title.message}`}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium">Price</label>
                    <div className="mt-1">
                      <input
                        {...register("price")}
                        // type="number" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product price"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500">{`${errors.price.message}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Stock</label>
                    <div className="mt-1">
                      <input
                        {...register("stock")}
                        type="number" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product stock"
                      />
                    </div>
                    {errors.stock && (
                      <p className="text-red-500">{`${errors.stock.message}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Brand</label>
                    <div className="mt-1">
                      <input
                        {...register("brand")}
                        type="text" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product brand"
                      />
                    </div>
                    {errors.brand && (
                      <p className="text-red-500">{`${errors.brand.message}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Color</label>
                    <div className="mt-1">
                      <input
                        {...register("color")}
                        type="text" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product color"
                      />
                    </div>
                    {errors.color && (
                      <p className="text-red-500">{`${errors.color.message}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Size</label>
                    <div className="mt-1">
                      <input
                        {...register("size")}
                        type="text" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product size"
                      />
                    </div>
                    {errors.size && (
                      <p className="text-red-500">{`${errors.size.message}`}</p>
                    )}
                  </div>

                  <div>
                    {loadingCategory && <Loading/>}
                    {categoriesData && categoriesData.categories && (
                      <>
                      <label className="block text-sm font-medium">Select Category</label>
                      <div className="mt-1">
                        <select
                          {...register("category")}
                          className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                        >
                          {categoriesData.categories.map((category)=> (
                            <option 
                              key={category._id} 
                              value={category._id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category && (
                        <p className="text-red-500">{`${errors.category.message}`}</p>
                      )}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <div className="mt-1">
                    <textarea
                      {...register("description")}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Enter product description"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-red-500">{`${errors.description.message}`}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Meta Description</label>
                  <div className="mt-1">
                    <textarea
                      {...register("metaDescription")}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Enter meta description for SEO"
                    />
                  </div>
                  {errors.metaDescription && (
                    <p className="text-red-500">{`${errors.metaDescription.message}`}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Select Images</label>
                  <div className="mt-1">
                    <input
                      // {...register("image")}
                      type="file"
                      multiple
                      required
                      onChange={(e)=> {
                        if (!e.target.files) return;
                        setFiles(e.target.files)
                      }}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                      placeholder="Upload Images"
                    />
                  </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {files && files.length > 0 && Array.from(files).map((file, index)=>
                    <Image key={index} src={URL.createObjectURL(file)} className="w-[8rem] h-[6rem] my-4 object-cover" width={1024} height={1024} alt='Preview' />
                  )}
                </div>
                <div>
                  <button disabled={isSubmitting} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all">Add New Product</button>
                </div>
              </form>
            </div>
          </div>
        </motion.div> 

      ) : null}     
    </>
  )
}

export default ProductCreateModal;