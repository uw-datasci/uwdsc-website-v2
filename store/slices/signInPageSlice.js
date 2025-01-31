import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signInPageSlice = createSlice({
  name: "signInPage",
  initialState,
  reducers : {
    displaySignIn : (state) => {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      state.value = true;
    },
    removeSignIn : (state) => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      state.value = false;
    }
  }
});

export const {displaySignIn, removeSignIn} = signInPageSlice.actions;
export default signInPageSlice.reducer;