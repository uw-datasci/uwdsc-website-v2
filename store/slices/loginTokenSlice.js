import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
  role: "",
};

const loginTokenSlice = createSlice({
  name: "loginTokenPage",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.role = "";
    },
  },
});

export const { login, logout } = loginTokenSlice.actions;
export default loginTokenSlice.reducer;
