import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import profileSlice from './features/profileSlice';
import eventsReducer from "./features/eventsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
    events: eventsReducer,
}
});

export default store;
