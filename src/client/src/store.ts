import { combineReducers, configureStore } from '@reduxjs/toolkit';
import wallReducer from './reducers/wallSlice';
import routesReducer from './reducers/routesSlice';
import wallsReducer from './reducers/wallsSlice';

// ROOT REDUCER
const rootReducer = combineReducers({
  wall: wallReducer,
  routes: routesReducer,
  walls: wallsReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: rootReducer,
});
