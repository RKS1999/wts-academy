import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    logout(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("proimg");
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
