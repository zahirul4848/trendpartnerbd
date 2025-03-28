"use client"
import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { useGetAllCategoriesQuery } from '@/lib/features/category-api-slice';
import { productSchema, TProductSchema } from '@/lib/types/types';
import {motion} from "framer-motion";
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import { useGetProductQuery, useUpdateProductMutation } from '@/lib/features/product-api-slice';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type TProductEdit = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  id: string | null;
}

const ProductEditModal = ({setRequestRefetch, setShowEditModal, showEditModal, id}: TProductEdit) => {
  const session = useSession();
  const [files, setFiles] = useState<FileList | null>(null);
  const [updateProduct] = useUpdateProductMutation();
  const {data: product, isLoading, refetch} = useGetProductQuery(id);
  const {data: categoriesData, isLoading: loadingCategory, refetch: refetchCategory} = useGetAllCategoriesQuery({});
  
  const formik = useFormik({
    initialValues: {
      title: product?.title || "",
      category: product?.category._id || "",
      price: product?.price || 0,
      description: product?.description || "",
      metaDescription: product?.metaDescription || "",
      color: product?.color || "",
      size: product?.size || "",
      brand: product?.brand || "",
      stock: product?.stock || 0,
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(productSchema),
    onSubmit: async(data: TProductSchema)=> {
      if(files) {
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
            const response = await updateProduct({id, data: {...data, imageUrl: uploadData}}).unwrap();
            toast.success(response.message);
            setRequestRefetch(true);
            setShowEditModal(false);
          } else {
            toast.error("Upload not completed");
          }
        } catch (error: any) {
          toast.error(error?.data?.message || error.error);
        }
      } else {
        try {
          const response = await updateProduct({id, data: {...data}}).unwrap();
          toast.success(response.message);
          setRequestRefetch(true);
          setShowEditModal(false);
        } catch (error:any) {
          toast.error(error?.data?.message || error.error);
        }
      }      
    }
  });
  const {handleSubmit, values, handleChange, errors, isSubmitting} = formik;

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
              {product && (
                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium">Product Title</label>
                    <div className="mt-1">
                      <input
                        value={values.title}
                        onChange={handleChange}
                        id='title'
                        name='title'
                        type="text" 
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product title"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-red-500">{`${errors.title}`}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium">Price</label>
                      <div className="mt-1">
                        <input
                          id='price'
                          name='price'
                          value={values.price}
                          onChange={handleChange} 
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                          placeholder="Enter product price"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-500">{`${errors.price}`}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Stock</label>
                      <div className="mt-1">
                        <input
                          id='stock'
                          name='stock'
                          value={values.stock}
                          onChange={handleChange}
                          type="number" 
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                          placeholder="Enter product stock"
                        />
                      </div>
                      {errors.stock && (
                        <p className="text-red-500">{`${errors.stock}`}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Brand</label>
                      <div className="mt-1">
                        <input
                          id='brand'
                          name='brand'
                          value={values.brand}
                          onChange={handleChange}
                          type="text" 
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                          placeholder="Enter product brand"
                        />
                      </div>
                      {errors.brand && (
                        <p className="text-red-500">{`${errors.brand}`}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Color</label>
                      <div className="mt-1">
                        <input
                          id='color'
                          name='color'
                          value={values.color}
                          onChange={handleChange}
                          type="text" 
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                          placeholder="Enter product color"
                        />
                      </div>
                      {errors.color && (
                        <p className="text-red-500">{`${errors.color}`}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Size</label>
                      <div className="mt-1">
                        <input
                          id='size'
                          name='size'
                          value={values.size}
                          onChange={handleChange}
                          type="text" 
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                          placeholder="Enter product size"
                        />
                      </div>
                      {errors.size && (
                        <p className="text-red-500">{`${errors.size}`}</p>
                      )}
                    </div>

                    <div>
                      {loadingCategory && <Loading/>}
                      {categoriesData && categoriesData.categories && (
                        <>
                        <label className="block text-sm font-medium">Select Category</label>
                        <div className="mt-1">
                          <select
                            id='category'
                            name='category'
                            value={values.category}
                            onChange={handleChange}
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
                          <p className="text-red-500">{`${errors.category}`}</p>
                        )}
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <div className="mt-1">
                      <textarea
                        id='description'
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter product description"
                      />
                    </div>
                    {errors.description && (
                      <p className="text-red-500">{`${errors.description}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Meta Description</label>
                    <div className="mt-1">
                      <textarea
                        id='metaDescription'
                        name='metaDescription'
                        value={values.metaDescription}
                        onChange={handleChange}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" 
                        placeholder="Enter meta description for SEO"
                      />
                    </div>
                    {errors.metaDescription && (
                      <p className="text-red-500">{`${errors.metaDescription}`}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Select Images</label>
                    <div className="mt-1">
                      <input
                        // {...register("image")}
                        type="file"
                        multiple
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
                    {files && files.length > 0 ? Array.from(files).map((file, index)=>
                      <Image key={index} src={URL.createObjectURL(file)} className="w-[8rem] h-[6rem] my-4 object-cover" width={1024} height={1024} alt='Preview' />
                    ) : (
                      product.imageUrls.map((item)=> (
                        <Image key={item.public_id} src={item.url} className="w-[8rem] h-[6rem] my-4 object-cover" width={1024} height={1024} alt='Preview' />
                      ))
                    )}
                  </div>
                  <div>
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all"
                    >
                      Update Product
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

export default ProductEditModal;