import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ""
};

const loginTokenSlice = createSlice({
  name: "loginTokenPage",
  initialState,
  reducers : {
    login : (state, action) => {
      state.value = action.payload;
    },
    logout : (state) => {
      state.value = "";
    }
  }
});

export const {login, logout} = loginTokenSlice.actions;
export default loginTokenSlice.reducer;