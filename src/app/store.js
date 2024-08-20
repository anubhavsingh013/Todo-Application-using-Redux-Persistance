import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/TodoSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
export const store = configureStore({
  reducer: {
    todo: persistReducer(persistConfig, todoReducer),
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false},)
});

export const persistor = persistStore(store);
