import {configureStore} from "@reduxjs/toolkit";
import globalSlice from "@/lib/features/global-slice";
import { userApiSlice } from "./features/user-api-slice";
import { categoryApiSlice } from "./features/category-api-slice";
import { productApiSlice } from "./features/product-api-slice";
import { orderApiSlice } from "./features/order-api-slice";


export const store = configureStore({
  reducer: {
    global: globalSlice,
    //auth: authApiSlice,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat([
    userApiSlice.middleware, categoryApiSlice.middleware, productApiSlice.middleware, orderApiSlice.middleware,
  ]),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;



