import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
  isAdmin: false,
};

const loginTokenSlice = createSlice({
  name: "loginTokenPage",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = loginTokenSlice.actions;
export default loginTokenSlice.reducer;
