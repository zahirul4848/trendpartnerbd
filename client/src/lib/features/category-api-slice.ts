import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TCategory } from "../types/types";

type TCategoriesData = {
  categories: TCategory[],
  pages: number;
}

type TCategoriesQuery = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}

const CATEGORY_URL = "/api/category";

export const categoryApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    // credentials: "include",
    prepareHeaders: async(headers, {getState})=> {
      const session = await getSession();
      if(session?.user.token) {
        headers.set("Authorization", `Bearer ${session?.user.token}`);
      }
      return headers;
    }
  }),
  reducerPath: "categoryApi",
  tagTypes: ["CATEGORY"],
  endpoints: (builder)=> ({
    getAllCategories: builder.query<TCategoriesData, TCategoriesQuery>({
      query: ({name="", pageNumber= "", pageSize=""})=> ({
        url: `${CATEGORY_URL}?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    // getAllCategories: builder.query<TCategory[], void>({
    //   query: ()=> ({
    //     url: `${CATEGORY_URL}/redis`,
    //     method: "GET",
    //   }),
    // }),
    getCategory: builder.query<TCategory, string | null>({
      query: (id)=> ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} = categoryApiSlice;