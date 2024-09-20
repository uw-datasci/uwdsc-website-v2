import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: ""
};

const loginTokenSlice = createSlice({
  name: "loginTokenPage",
  initialState,
  reducers : {
    login : (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout : (state) => {
      state.name = "";
      state.token = "";
    }
  }
});

export const {login, logout} = loginTokenSlice.actions;
export default loginTokenSlice.reducer;