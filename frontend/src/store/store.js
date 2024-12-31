import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./slice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token']
  }

  const reducer = combineReducers({
    token: Slice.reducer
  })  

  const persistedReducer = persistReducer(persistConfig, reducer)

  export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });