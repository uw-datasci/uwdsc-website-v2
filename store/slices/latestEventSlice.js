import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: null,
  isRegistered: false,
  isCheckedIn: false
};

const slice = createSlice({
  name: "latestEvent",
  initialState,
  reducers: {
    setLatestEvent: (state, action) => {
      if (!state.event || state.event.id !== action.payload.id) {
        state.isRegistered = false;
        state.isCheckedIn = false;
      }
      state.event = action.payload;
    },
    setRegistrationStatus: (state, action) => {
      state.isRegistered = action.payload.isRegistered;
      state.isCheckedIn = action.payload.isCheckedIn;
    }
  }
});

export const { setLatestEvent, setRegistrationStatus } = slice.actions;
export default slice.reducer; 