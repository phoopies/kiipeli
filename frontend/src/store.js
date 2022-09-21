import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wallReducer from "./reducers/wallSlice";
import routesReducer from "./reducers/routesSlice";
import wallsReducer from "./reducers/wallsSlice";
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
import storage from "redux-persist/lib/storage";

// ROOT REDUCER
const rootReducer = combineReducers({
  wall: wallReducer,
  routes: routesReducer,
  walls: wallsReducer,
});

// CONFIGURE PERSIST
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// CONFIGURE STORE
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
