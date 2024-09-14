import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signInPageSlice = createSlice({
  name: "signInPage",
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

export const {moveUp, moveDown} = signInPageSlice.actions;
export default signInPageSlice.reducer;