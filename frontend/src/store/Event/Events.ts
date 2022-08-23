import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Event } from "../../components/helpers/interface/Event";
import { alertToast, succesToast } from "../../components/helpers/toast/Toast";
const API = "http://localhost:4000/graphql";

// * creating events

export const fetchAsyncCreateEvents = createAsyncThunk(
  "Events/fetchAsyncCreateEvents",
  async (eventInput: Event) => {
    const {
      title,
      category,
      description,
      brief,
      price,
      date,
      tickets,
      images,
    } = eventInput;
    const { data } = await axios.post<Event>(
      API,
      {
        query: `
                  mutation{
                    createEvent(eventInput:{title:"${title}",category:"${category}",description:"""${description}""",brief:"${brief}",price:${price},date:"${date}",tickets:${tickets},images:${JSON.stringify(
          images
        )}}){
                    
                      author{
                            email
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

// * fetching All events

export const fetchAsyncGetAllEvents = createAsyncThunk(
  "Events/fetchAsyncGetAllEvents",
  async () => {
    const { data } = await axios.post(
      API,
      {
        query: `
        query{
          events{
            _id
            title
            price
            brief
            date
            images{
              url
            }
            category
          }
        }
              `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
);

// * fetching Single event

export const fetchAsyncGetSingleEvent = createAsyncThunk(
  "Events/fetchAsyncGetSingleEvent",
  async (id: any) => {
    const { data } = await axios.post(
      API,
      {
        query: `
        query{
          singleEvent(eventId:"${id}"){
            _id
            title
            tickets
            price
            description
            brief
            category
            date
            images{
              url
              public_id
            }
            author{
              email
              _id
            }
          }
        }
              `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }
);

//*deleting event thunk

export const fetchAsyncDeleteEvent = createAsyncThunk(
  "Events/fetchAsyncDeleteEvent",
  async (id: any) => {
    const { data } = await axios.post(
      API,
      {
        query: `
        mutation{
          deleteEvent(eventId:"${id}"){
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

//*fetching user created Events

export const fetchAsyncUserCreatedEvents = createAsyncThunk(
  "Events/fetchAsyncUserCreatedEvents",
  async () => {
    const { data } = await axios.post(
      API,
      {
        query: `
      query{
        userCreatedEvents{
          createdEvents{
            title
            date
            _id
            tickets
            brief
            images{
              url
            }
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
//*declaring our initial state

const initialState = {
  Events: [],
  Eventsearch: "",
  createdEventsSearch: "",
  SingleEvent: {},
  detailsPending: false,
  detailsFail: false,
  allEventsPending: false,
  allEventsFail: false,
  createEventPending: false,
  userCreatedEvents: [],
  userCreatedPending: false,
  userCreatedFail: false,
  filters: {},
};

//*writing our event slice

const EventsSlice = createSlice({
  name: "Events",
  initialState,
  reducers: {
    searchEventText: (state: any, { payload }: any) => {
      state.Eventsearch = payload;
    },
    searchCreatedEventText: (state: any, { payload }: any) => {
      state.createdEventsSearch = payload;
    },
    filtering: (state: any, { payload }: any) => {
      state.filters = payload;
    },
  },
  extraReducers: (builder) => {
    // * creating events

    builder.addCase(fetchAsyncCreateEvents.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        createEventPending: true,
      };
    });
    builder.addCase(fetchAsyncCreateEvents.fulfilled, (state, { payload }) => {
      succesToast("Successfully Created Event");
      return {
        ...state,
        createEventPending: false,
      };
    });
    builder.addCase(fetchAsyncCreateEvents.rejected, (state) => {
      alertToast("Creating Event Failed!!");
      return {
        ...state,
        createEventPending: false,
      };
    });

    // * getting events

    builder.addCase(fetchAsyncGetAllEvents.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        allEventsPending: true,
        allEventsFail: false,
      };
    });
    builder.addCase(fetchAsyncGetAllEvents.fulfilled, (state, { payload }) => {
      return {
        ...state,
        Events: payload.data.events,
        allEventsPending: false,
        allEventsFail: false,
      };
    });
    builder.addCase(fetchAsyncGetAllEvents.rejected, (state) => {
      console.log("rejected");
      return {
        ...state,
        allEventsPending: false,
        allEventsFail: true,
      };
    });

    //* getting Single Event For Details Page

    builder.addCase(fetchAsyncGetSingleEvent.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        detailsPending: true,
        detailsFail: false,
      };
    });
    builder.addCase(
      fetchAsyncGetSingleEvent.fulfilled,
      (state, { payload }) => {
        return {
          ...state,
          SingleEvent: payload.data.singleEvent,
          detailsPending: false,
          detailsFail: false,
        };
      }
    );
    builder.addCase(fetchAsyncGetSingleEvent.rejected, (state) => {
      console.log("rejected");
      return {
        ...state,
        detailsPending: false,
        detailsFail: true,
      };
    });

    //*deleting event

    builder.addCase(fetchAsyncDeleteEvent.pending, () => {
      console.log("pending delete");
    });
    builder.addCase(fetchAsyncDeleteEvent.fulfilled, () => {
      console.log("deleted!!");
      succesToast("Event Deleted Successfully");
    });
    builder.addCase(fetchAsyncDeleteEvent.rejected, () => {
      console.log("rejected delete!!");
      alertToast("Event Delete Failed!!");
    });
    //*getting user created Events
    builder.addCase(fetchAsyncUserCreatedEvents.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        userCreatedPending: true,
        userCreatedFail: false,
      };
    });
    builder.addCase(
      fetchAsyncUserCreatedEvents.fulfilled,
      (state, { payload }) => {
        console.log(payload.data.userCreatedEvents.createdEvents);
        return {
          ...state,
          userCreatedEvents: payload.data.userCreatedEvents.createdEvents,
          userCreatedPending: false,
          userCreatedFail: false,
        };
      }
    );
    builder.addCase(fetchAsyncUserCreatedEvents.rejected, (state) => {
      console.log("failed");
      return {
        ...state,
        userCreatedPending: false,
        userCreatedFail: true,
      };
    });
  },
});

//*retreiving data after fetching

export const GetEvents = (state: { Events: { Events: any } }) =>
  state.Events.Events;
export const GetSingleEvent = (state: { Events: { SingleEvent: any } }) =>
  state.Events.SingleEvent;
export const userCreatedEvents = (state: {
  Events: { userCreatedEvents: any };
}) => state.Events.userCreatedEvents;

//*getting searching text

export const { searchEventText } = EventsSlice.actions;
export const { searchCreatedEventText } = EventsSlice.actions;
export const { filtering } = EventsSlice.actions;
export const Eventsearch = (state: { Events: { Eventsearch: string } }) =>
  state.Events.Eventsearch;
export const createdEventsSearch = (state: {
  Events: { createdEventsSearch: string };
}) => state.Events.createdEventsSearch;
export const filters = (state: { Events: { filters: any } }) =>
  state.Events.filters;
//*getting pending status

export const detailsPending = (state: {
  Events: { detailsPending: boolean };
}) => state.Events.detailsPending;
export const allEventsPending = (state: {
  Events: { allEventsPending: boolean };
}) => state.Events.allEventsPending;
export const createEventPending = (state: {
  Events: { createEventPending: boolean };
}) => state.Events.createEventPending;

export const userCreatedPending = (state: {
  Events: { userCreatedPending: boolean };
}) => state.Events.userCreatedPending;
//*getting failure status

export const detailsFail = (state: { Events: { detailsFail: boolean } }) =>
  state.Events.detailsFail;
export const allEventsFail = (state: { Events: { allEventsFail: boolean } }) =>
  state.Events.allEventsFail;
export const userCreatedFail = (state: {
  Events: { userCreatedFail: boolean };
}) => state.Events.userCreatedFail;
//*exporting slice to store

export default EventsSlice.reducer;
