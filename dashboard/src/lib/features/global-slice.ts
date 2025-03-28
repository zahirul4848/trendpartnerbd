import { createSlice } from "@reduxjs/toolkit";

type GlobalState = {
  isSidebarOpen: boolean;
  // theme: "light" | "dark";
}

const initialState: GlobalState = {
  isSidebarOpen: false,
  // theme: typeof window !== "undefined" && window.localStorage.getItem("theme") === "dark" ? "dark" : "light"
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action)=> {
      state.isSidebarOpen = action.payload;
    },
    // toggleTheme: (state)=> {
    //   if(state.theme === "light") {
    //     state.theme = "dark";
    //     window.localStorage.setItem("theme", "dark");
    //     document.documentElement.classList.add("dark");
    //   } else {
    //     state.theme = "light";
    //     window.localStorage.setItem("theme", "light");
    //     document.documentElement.classList.remove("dark");
    //   }
    // }
  }
});

export const { setIsSidebarOpen } = globalSlice.actions;
export default globalSlice.reducer;