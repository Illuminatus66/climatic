import { configureStore} from '@reduxjs/toolkit';
import interactionsReducer from './interactionsSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import weatherReducer from './weatherSlice';
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
    auth: authReducer,
    user: userReducer,
    weather: weatherReducer,
  },
  middleware: [thunk]
});
