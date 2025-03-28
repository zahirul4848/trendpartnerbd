import { getSession } from "next-auth/react"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { TProduct, TUser, TUserProfile } from "../types/types";
const USER_URL = "/api/user";


export const userApiSlice = createApi({
  
  reducerPath: "userApi",
  tagTypes: ["USER"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    prepareHeaders: async(headers, {getState})=> {
      const session = await getSession();
      if(session?.user.token) {
        headers.set("Authorization", `Bearer ${session?.user.token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder)=> ({
    login: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/forgotPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/resetPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    register: builder.mutation<TUser, Partial<TUser>>({
      query: (data)=> ({
        url: USER_URL,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query<TUserProfile, void>({
      query: ()=> ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation<{message: string}, {name: string; email: string; password?: string}>({
      query: (data)=> ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{message: string}, {email: string, password: string}>({
      query: (data)=> ({
        url: `${USER_URL}/deleteme`,
        method: "DELETE",
        body: data
      }),
    }),
    addToWishlist: builder.mutation<{message: string}, {productId: string}>({
      query: (productId)=> ({
        url: `${USER_URL}/add-wishlist`,
        method: "PUT",
        body: productId,
      })
    }),
    removeFromWishlist: builder.mutation<{message: string}, {productId: string}>({
      query: (productId)=> ({
        url: `${USER_URL}/remove-wishlist`,
        method: "PUT",
        body: productId,
      })
    }),
    getWishlist: builder.query<TProduct[], void>({
      query: ()=> ({
        url: `${USER_URL}/wishlist`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} = userApiSlice;