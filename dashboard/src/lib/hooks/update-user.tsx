import React from 'react';
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from '../features/user-api-slice';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { TUserSchema, userSchema } from '../types/types';
import toast from 'react-hot-toast';

type TUserEdit = {
  setRequestRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  id: string | null;
}


const useUpdateUser = ({setRequestRefetch, setShowEditModal, showEditModal, id}: TUserEdit) => {
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

  return {user, isLoading, showEditModal, setShowEditModal, handleSubmit, handleChange, errors, isSubmitting}
}

export default useUpdateUser;