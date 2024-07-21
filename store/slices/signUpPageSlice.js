import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signUpPageSlice = createSlice({
  name: "signUpPage",
  initialState,
  reducers : {
    moveUp : (state) => {
      state.value = true;
    },
    moveDown : (state) => {
      state.value = false;
    }
  }
});

export const {moveUp, moveDown} = signUpPageSlice.actions;
export default signUpPageSlice.reducer;