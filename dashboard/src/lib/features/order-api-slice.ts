import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TOrder } from "../types/types";

type TOderQuery = {
  orderNumber?: string;
  pageNumber?: number; 
  pageSize?: number;
}

type TOderAction = {
  id: string;
  data: {
    title: string;
    description: string;
  }
}

const ORDER_URL = "/api/order";

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
    getAllOrders: builder.query<{orders: TOrder[]; pages: number;}, TOderQuery>({
      query: ({orderNumber="", pageNumber="", pageSize=""})=> ({
        url: `${ORDER_URL}?orderNumber=${orderNumber}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getOrder: builder.query<TOrder, string>({
      query: (id)=> ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateOrderAction: builder.mutation<{message: string}, TOderAction>({
      query: ({id, data})=> ({
        url: `${ORDER_URL}/action/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id)=> ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderActionMutation,
  useDeleteOrderMutation,
} = orderApiSlice;