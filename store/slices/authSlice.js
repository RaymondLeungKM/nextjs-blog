import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.jwt = action.payload.jwt), (state.user = action.payload.user);
    },
    logout: (state) => {
      (state.jwt = ""), (state.user = {});
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;