import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import profileSlice from './features/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice    
  },
});

export default store;
