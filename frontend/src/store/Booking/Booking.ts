import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Booking } from "../../components/helpers/interface/Booking";
import { Event } from "../../components/helpers/interface/Event";
import { alertToast, succesToast } from "../../components/helpers/toast/Toast";
const API = "http://localhost:4000/graphql";

export const fetchAsyncBookEvent = createAsyncThunk(
  "Bookings/fetchAsyncBookEvent",
  async (eventId: string) => {
    const { data } = await axios.post<Booking>(
      API,
      {
        query: `
                    mutation{
                        bookEvent(eventId:"${eventId}"){
                            _id
                            event{
                              title
                              price
                            }
                            user{
                                _id
                              }
                          }
                    }
                `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);

export const fetchAsyncGetAllBookings = createAsyncThunk(
  "Bookings/fetchAsyncGetAllBookings",
  async () => {
    const { data } = await axios.post(
      API,
      {
        query: `
        query{
          userBooking{
            _id
            createdAt
            event{
                      title
                      price
                      brief
                      date
                      _id
                      images{
                        url
                      }
                    }
                    user{
                        _id
                      }
                  }
            }
                `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);
export const fetchAsyncCancelBooking = createAsyncThunk(
  "Bookings/fetchAsyncCancelBooking",
  async (bookingId: string) => {
    const { data } = await axios.post(
      API,
      {
        query: `
      mutation{
        cancelBooking(bookingId:"${bookingId}"){
          title
        }
      }
              `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);
const initialState = {
  bookings: [],
  bookingSearch: "",
  bookingPending: false,
  bookingFail: false,
  gettingBookingPending: false,
  gettingBookingFail: false,
};

const BookingsSlice = createSlice({
  name: "Bookings",
  initialState,
  reducers: {
    searchBookingText: (state: any, { payload }: any) => {
      state.bookingSearch = payload;
    },
  },
  extraReducers: (builder) => {
    //*booking event proccess
    builder.addCase(fetchAsyncBookEvent.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        bookingPending: true,
        bookingFail: false,
      };
    });
    builder.addCase(fetchAsyncBookEvent.fulfilled, (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        bookingPending: false,
        bookingFail: false,
      };
    });
    builder.addCase(fetchAsyncBookEvent.rejected, (state) => {
      console.log("rejected");
      return {
        ...state,
        bookingPending: false,
        bookingFail: true,
      };
    });
    //*getting all bookings data
    builder.addCase(fetchAsyncGetAllBookings.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        gettingBookingPending: true,
        gettingBookingFail: false,
      };
    });
    builder.addCase(
      fetchAsyncGetAllBookings.fulfilled,
      (state, { payload }) => {
        return {
          ...state,
          bookings: payload.data.userBooking,
          gettingBookingPending: false,
          gettingBookingFail: false,
        };
      }
    );
    builder.addCase(fetchAsyncGetAllBookings.rejected, (state, { payload }) => {
      console.log("rejected");
      return {
        ...state,
        gettingBookingPending: false,
        gettingBookingFail: true,
      };
    });
    //*canceling booking
    builder.addCase(fetchAsyncCancelBooking.pending, () => {
      console.log("pending");
    });
    builder.addCase(fetchAsyncCancelBooking.fulfilled, (state, { payload }) => {
      console.log("canceled booking");
      succesToast("Successfully Canceled booking");
      console.log(payload);
    });
    builder.addCase(fetchAsyncCancelBooking.rejected, (state, { payload }) => {
      console.log("canceled booking rejected!!");
      alertToast("canceling booking failed");
      console.log(payload);
    });
  },
});

export const { searchBookingText } = BookingsSlice.actions;
export const bookingSearch = (state: { Bookings: { bookingSearch: string } }) =>
  state.Bookings.bookingSearch;
export const GetBookings = (state: { Bookings: { bookings: any[] } }) =>
  state.Bookings.bookings;

export const gettingBookingPending = (state: {
  Bookings: { gettingBookingPending: boolean };
}) => state.Bookings.gettingBookingPending;
export const gettingBookingFail = (state: {
  Bookings: { gettingBookingFail: boolean };
}) => state.Bookings.gettingBookingFail;
export const bookingPending = (state: {
  Bookings: { bookingPending: boolean };
}) => state.Bookings.bookingPending;
export const bookingFail = (state: { Bookings: { bookingFail: boolean } }) =>
  state.Bookings.bookingFail;
export default BookingsSlice.reducer;
