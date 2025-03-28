import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TProduct, TReviewSchema } from "../types/types";

const PRODUCT_URL = "/api/product";

type TProductQuery = {
  name?: string;
  pageNumber?: number; 
  pageSize?: number;
  categoryId?: string;
  order?: string;
  categoryName?: string;
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
      query: ({name="", pageNumber="", pageSize= "", categoryId="", order="", categoryName=""})=> ({
        url: `${PRODUCT_URL}?name=${name}&categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}&order=${order}&categoryName=${categoryName}`,
        method: "GET",
      }),
    }),
    // getAllProductsSearch: builder.query<TProduct[], void>({
    //   query: ()=> ({
    //     url: `${PRODUCT_URL}/redis`,
    //     method: "GET",
    //   }),
    // }),
    getProduct: builder.query<TProduct, string>({
      query: (slug)=> ({
        url: `${PRODUCT_URL}/slug/${slug}`,
        method: "GET",
      }),
    }),
    createReview: builder.mutation<{message: string}, {id: string; data: TReviewSchema}>({
      query: ({id, data})=> ({
        url: `${PRODUCT_URL}/${id}/review`,
        method: "POST",
        body: data,
      })
    }) 
  }),
});


export const {
  useGetAllProductsQuery,
  // useGetAllProductsSearchQuery,
  useGetProductQuery,
  useCreateReviewMutation,
} = productApiSlice;