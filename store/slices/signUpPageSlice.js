import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signUpPageSlice = createSlice({
  name: "signUpPage",
  initialState,
  reducers : {
    moveUp : (state) => {
      document.body.style.overflow = "hidden";
      state.value = true;
    },
    moveDown : (state) => {
      document.body.style.overflow = "";
      state.value = false;
    }
  }
});

export const {moveUp, moveDown} = signUpPageSlice.actions;
export default signUpPageSlice.reducer;