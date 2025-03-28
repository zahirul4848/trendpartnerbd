import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TOrder, TOrderBody } from "../types/types";

const ORDER_URL = "/api/order";

type TOrderResult = {
  message: string;
  orderId: string;
  orderNumber: string;
}


export const orderApiSlice = createApi({
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
  reducerPath: "orderApi",
  tagTypes: ["ORDER"],
  endpoints: (builder)=> ({
    getOrder: builder.query<TOrder, string>({
      query: (id)=> ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<TOrderResult, TOrderBody>({
      query: (data)=> ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
    getUserOrders: builder.query<TOrder[], void>({
      query: ()=> ({
        url: `${ORDER_URL}/profile`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
} = orderApiSlice;