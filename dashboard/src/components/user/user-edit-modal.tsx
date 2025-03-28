"use client"
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import toast from 'react-hot-toast';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {motion} from "framer-motion";
import { useFormik } from 'formik';
import Loading from '../loading';
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from '@/lib/features/user-api-slice';
import { TUserSchema, userSchema } from '@/lib/types/types';

type TUserEdit = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  id: string | null;
}

const UserEditModal = ({setRequestRefetch, setShowEditModal, showEditModal, id}: TUserEdit) => {
  const [updateUser] = useUpdateUserByIdMutation();
  const {data: user, isLoading} = useGetUserByIdQuery(id);

  const formik = useFormik({
    initialValues: {
      role: user?.role || "CLIENT"
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userSchema),
    onSubmit: async(data: TUserSchema)=> {
      try {
        const response = await updateUser({id, data: {role: data.role}}).unwrap();
        toast.success(response.message);
        setRequestRefetch(true);
        setShowEditModal(false);
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
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
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div className="relative rounded-lg bg-gray-100 dark:bg-gray-800 shadow p-2 md:p-4">
              <button 
                type="button"
                onClick={()=> setShowEditModal(false)}
                className="absolute right-0 top-0"
              >
                <IoMdCloseCircle className="hover:text-red-700 text-xl hover:scale-105 transition-all" />
              </button>

              <h2 className="text-lg font-bold text-center">Change user role</h2>
              
              {isLoading && <Loading/>}
              {user && (
                <>
                <p className="mt-4">ID: {user._id}</p>
                <p>User: {user.name}</p>
                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">Category Title</label>
                    <div className="mt-1">
                      <select
                        id='role'
                        name='role'
                        value={values.role}
                        onChange={handleChange}
                        className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                      >
                        <option value="CLIENT">CLIENT</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      
                    </div>
                    {errors.role && (
                      <p className="text-red-500">{`${errors.role}`}</p>
                    )}
                  </div>
                  
                  
                  <div>
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-300 transition-all"
                    >
                      Update User
                    </button>
                  </div>
                </form>
                </>
              )}

            </div>
          </div>
        </motion.div> 
      ) : null}     
    </>
  )
}

export default UserEditModal;