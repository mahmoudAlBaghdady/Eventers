import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./Auth/LoginSlice";
import SignUpReducer from "./Auth/SignUpSlice";
import EventsReducer from "./Event/Events";
import BookingsReducer from "./Booking/Booking";
const store = configureStore({
  reducer: {
    SignUp: SignUpReducer,
    Login: LoginReducer,
    Events: EventsReducer,
    Bookings: BookingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
