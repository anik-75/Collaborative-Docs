import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/auth.slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // Choose your storage engine; defaults to localStorage for web
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  users: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store, {
  onBeforeLift: () => console.log("Before rehydration"),
});
