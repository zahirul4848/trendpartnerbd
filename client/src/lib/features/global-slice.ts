import { createSlice } from "@reduxjs/toolkit";
import { TCart } from "../types/types";

type GlobalState = {
  isSidebarOpen: boolean;
  isCartModalOpen: boolean;
  cart: TCart[];
}

const ISSERVER = typeof window === "undefined";

const items = !ISSERVER && localStorage.getItem("cartItems");

const initialState: GlobalState = {
  isSidebarOpen: false,
  isCartModalOpen: false,
  cart: items ? JSON.parse(items) : [],
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action)=> {
      state.isSidebarOpen = action.payload;
    },
    setIsCartModalOpen: (state, action)=> {
      state.isCartModalOpen = action.payload;
    },
    addToCart: (state, action)=> {
      const item = action.payload.item;
      const existItem = state.cart.find(x=> x.productId === item.productId);
      if(existItem) {
        state.cart = [...state.cart.map(x=> x.productId === existItem.productId ? item : x)];
      } else {
        state.cart = [...state.cart, item];
      }
      if (!ISSERVER) localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    increaseCount: (state, action)=> {
      const productId = action.payload.productId;
      state.cart = state.cart.map((item)=> {
        if(item.productId === productId && item.count < item.stock) {
          item.count++;
        }
        return item;
      })
      if (!ISSERVER) localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    decreaseCount: (state, action)=> {
      const productId = action.payload.productId;
      state.cart = state.cart.map((item)=> {
        if(item.productId === productId && item.count > 1) {
          item.count--;
        }
        return item;
      })
      if (!ISSERVER) localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action)=> {
      const productId = action.payload.productId;
      state.cart = state.cart.filter((item)=> item.productId !== productId);
      if (!ISSERVER) localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    resetCart: (state, action)=> {
      state.cart = [];
      if (!ISSERVER) localStorage.removeItem("cartItems");
    },
  }
});

export const { setIsSidebarOpen, setIsCartModalOpen, addToCart, removeFromCart, resetCart, increaseCount, decreaseCount } = globalSlice.actions;
export default globalSlice.reducer;