import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signInPageSlice = createSlice({
  name: "signInPage",
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

export const {moveUp, moveDown} = signInPageSlice.actions;
export default signInPageSlice.reducer;