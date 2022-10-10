import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    content: null
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state) => {
        state.show = true;
    },
    hideToast: (state) => {
        state.show = false;
    },
    toggleToast: (state) => {
        state.show = !state.show;
    },
    setContent: (state, action) => {
        state.content = action.payload;
    }
  },
});

export default toastSlice;

export const toastActions = toastSlice.actions;