import { configureStore } from "@reduxjs/toolkit";
import signUpPageReducer from "./slices/signUpPageSlice.js";

export const store = configureStore({
  reducer: {
    signUpPage: signUpPageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
