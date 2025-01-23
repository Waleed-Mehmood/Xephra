import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import profileSlice from './features/profileSlice';
import eventsReducer from "./features/eventsSlice";
import userReducer from "./features/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
    events: eventsReducer,
    user: userReducer
}
});

export default store;
