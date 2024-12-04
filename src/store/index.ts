import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { Action } from "redux-saga";
import rootReducer from "./slice/rootReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authentication"],
  // blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [PERSIST],
      // },
    })
      .prepend
      // untyped
      ()
      .concat(),
  // devTools: true,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

