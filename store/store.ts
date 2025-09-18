import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import signUpPageReducer from "./slices/signUpPageSlice.js";
import signInPageReducer from "./slices/signInPageSlice.js";
import loginTokenReducer from "./slices/loginTokenSlice.js"; // Rename to loginTokenReducer
import eventFormPageReducer from "./slices/eventFormPageSlice.js";
import latestEventReducer from "./slices/latestEventSlice";
import paidUsersReducer from "./slices/paidUsersSlice";

// all reducers
const rootReducer = combineReducers({
  signUpPage: signUpPageReducer,
  signInPage: signInPageReducer,
  loginToken: loginTokenReducer,
  eventFormPage: eventFormPageReducer,
  latestEvent: latestEventReducer,
  paidUsers: paidUsersReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginToken"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// handle persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
