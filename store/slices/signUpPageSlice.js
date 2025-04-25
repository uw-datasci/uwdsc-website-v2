import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const signUpPageSlice = createSlice({
  name: "signUpPage",
  initialState,
  reducers : {
    displaySignUp : (state) => {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      state.value = true;
    },
    removeSignUp : (state) => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      state.value = false;
    }
  }
});

export const {displaySignUp, removeSignUp} = signUpPageSlice.actions;
export default signUpPageSlice.reducer;