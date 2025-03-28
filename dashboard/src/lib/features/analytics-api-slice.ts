import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { TAnalytics } from "../types/types";


const ANALYTICS_URL = "/api/analytics";

export const analyticsApiSlice = createApi({
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
  reducerPath: "analyticsApi",
  tagTypes: ["ANALYTICS"],
  endpoints: (builder)=> ({
    getAllAnalytics: builder.query<TAnalytics, void>({
      query: ()=> ({
        url: `${ANALYTICS_URL}`,
        method: "GET",
      }),
    }),
  }),
});


export const {
  useGetAllAnalyticsQuery,
} = analyticsApiSlice;