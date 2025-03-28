import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeleteUserMutation, useGetUserProfileQuery, useGetWishlistQuery, useRemoveFromWishlistMutation, useUpdateUserProfileMutation } from "../features/user-api-slice";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useGetUserOrdersQuery } from "../features/order-api-slice";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { profileSettingSchema, TProfileSettingSchema } from "../types/types";

const useProfile = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"wishlist" | "orders" | "settings">("wishlist");
  const [deletePassword, setDeletePassword] = useState<string>("");
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  const {data: userProfile, isLoading} = useGetUserProfileQuery();
  const [deleteMyAccount, {isLoading: isLoadingDelete}] = useDeleteUserMutation();
  const {data: orders, isLoading: isLoadingOrders} = useGetUserOrdersQuery();
  const {data: wishlistData, isLoading: isLoadingWishlist, refetch} = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleRemoveFromWishlist = async (productId: string)=> {
    try {
      const response = await removeFromWishlist({productId}).unwrap();
      toast.success(response.message);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteAccount = async()=> {
    try {
      if(userProfile) {
        const response = await deleteMyAccount({password: deletePassword, email: userProfile?.email}).unwrap();
        toast.success(response.message);
        signOut();
        router.push("/");        
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);      
    }
  }

  const formik = useFormik({
    initialValues: {
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(profileSettingSchema),
    onSubmit: async(data: TProfileSettingSchema)=> {
      if(data.password !== data.confirmPassword) {
        toast.error("Password and confirm password are not same")
      } else {
        try {
          const response = await updateUserProfile({
            name: data.name,
            email: data.email,
            password: data.password,
          }).unwrap();
          toast.success(response.message);
          refetch();
        } catch (err:any) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  });
  const {handleSubmit, values, handleChange, errors, isSubmitting} = formik;
  
  useEffect(() => {
    if (section === "wishlist" || section === "orders" || section === "settings") {
      setActiveSection(section);
    } else {
      setActiveSection("wishlist");
    }
  }, [section]);

  return {
    isLoading,
    userProfile,
    activeSection,
    setActiveSection,
    isLoadingDelete,
    handleDeleteAccount,
    deletePassword,
    setDeletePassword,
    orders,
    isLoadingOrders,
    wishlistData,
    isLoadingWishlist,
    handleRemoveFromWishlist,
    handleSubmit, 
    values, 
    handleChange, 
    errors, 
    isSubmitting,
  }
}

export default useProfile;