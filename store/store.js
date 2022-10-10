import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./slices/authSlice";
import toastSlice from "./slices/toastSlice";

// creating store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer
  }
});

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);