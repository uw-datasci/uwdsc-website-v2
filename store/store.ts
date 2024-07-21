import { configureStore } from "@reduxjs/toolkit";
import signUpPageReducer from "./slices/signUpPageSlice.js";
import loginTokenSlice from "./slices/loginTokenSlice.js"

export const store = configureStore({
  reducer: {
    signUpPage: signUpPageReducer,
    loginToken: loginTokenSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
