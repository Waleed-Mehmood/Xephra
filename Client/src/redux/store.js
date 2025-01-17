import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import eventsReducer from "./features/eventsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});

export default store;
