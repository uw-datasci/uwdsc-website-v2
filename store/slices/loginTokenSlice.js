import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  token: ""
};

const loginTokenSlice = createSlice({
  name: "loginTokenPage",
  initialState,
  reducers : {
    login : (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout : (state) => {
      state.id = "";
      state.token = "";
    }
  }
});

export const {login, logout} = loginTokenSlice.actions;
export default loginTokenSlice.reducer;