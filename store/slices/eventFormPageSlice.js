import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const eventFormPageSlice = createSlice({
  name: "eventFormPage",
  initialState,
  reducers: {
    displayEventForm: (state) => {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      state.value = true;
    },
    removeEventForm: (state) => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      state.value = false;
    },
  },
});

export const { displayEventForm, removeEventForm } = eventFormPageSlice.actions;
export default eventFormPageSlice.reducer;
