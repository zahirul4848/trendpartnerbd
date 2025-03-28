import { getSession } from "next-auth/react"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { TUser } from "../types/types";
const USER_URL = "/api/user";

type TUsersData = {
  users: TUser[],
  pages: number;
}

type TUsersQuery = {
  name: string;
  pageNumber: number;
  pageSize: number;
}

export const userApiSlice = createApi({
  
  reducerPath: "userApi",
  tagTypes: ["USER"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    // credentials: "include",
    prepareHeaders: async(headers, {getState})=> {
      // const token = (getState() as any).auth?.userInfo?.token;
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
    getUserProfile: builder.query({
      query: ()=> ({
        url: `${USER_URL}/profile`,
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data)=> ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: builder.query<TUsersData, TUsersQuery>({
      query: ({name="", pageNumber= "", pageSize=""})=> ({
        url: `${USER_URL}?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query<TUser, string | null>({
      query: (id)=> ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),   
    updateUserById: builder.mutation<{message: string;}, {id: string | null, data: {role: "ADMIN" | "CLIENT"}}>({
      query: ({id, data})=> ({
        url: `${USER_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),   
    deleteUser: builder.mutation<{message: string}, string>({
      query: (id)=> ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),   
  }),
});


export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserMutation,
} = userApiSlice;