import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TProduct } from "../types/types";

const PRODUCT_URL = "/api/product";

type TProductQuery = {
  name?: string;
  pageNumber?: number; 
  pageSize?: number;
}

type TProductListResult = {
  pages: number;
  products: TProduct[]
}

export const productApiSlice = createApi({
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
  reducerPath: "productApi",
  tagTypes: ["PRODUCT"],
  endpoints: (builder)=> ({
    getAllProducts: builder.query<TProductListResult, TProductQuery>({
      query: ({name="", pageNumber="", pageSize= ""})=> ({
        url: `${PRODUCT_URL}?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getProduct: builder.query<TProduct, string | null>({
      query: (id)=> ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<any, any>({
      query: (data)=> ({
        url: PRODUCT_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation<{message: string;}, any>({
      query: ({id, data})=> ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id)=> ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;