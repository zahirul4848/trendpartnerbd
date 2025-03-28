import {configureStore} from "@reduxjs/toolkit";
import globalSlice from "@/lib/features/global-slice";
import { userApiSlice } from "./features/user-api-slice";
import { categoryApiSlice } from "./features/category-api-slice";
import { productApiSlice } from "./features/product-api-slice";
import { orderApiSlice } from "./features/order-api-slice";
import { analyticsApiSlice } from "./features/analytics-api-slice";


export const store = configureStore({
  reducer: {
    global: globalSlice,
    //auth: authApiSlice,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [analyticsApiSlice.reducerPath]: analyticsApiSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat([
    userApiSlice.middleware, categoryApiSlice.middleware, productApiSlice.middleware, orderApiSlice.middleware, analyticsApiSlice.middleware,
  ]),
});

// const initializeApp = async()=> {
//   await store.dispatch(userApiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
//   await store.dispatch(userApiSlice.endpoints.profile.initiate({}, {forceRefetch: true}));
// }

// initializeApp();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;



