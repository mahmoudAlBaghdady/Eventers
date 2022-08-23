import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { GetEvents, Eventsearch, filters } from "../../store/Event/Events";
import EventCard from "./EventCard";

const EventsList = () => {
  const allEvents = useSelector(GetEvents);
  const searchText = useSelector(Eventsearch);
  const filtering = useSelector(filters);

  const filteredEvents = allEvents.filter(
    (e: { date: any; price: number; category: string }) => {
      if (filtering.category !== "all") {
        if (
          e.category === filtering.category &&
          e.price >= filtering.price[0] &&
          e.price <= filtering.price[1] &&
          moment(e.date).unix() >= filtering.date1 &&
          moment(e.date).unix() <= filtering.date2
        ) {
          return e;
        }
      } else if (filtering.category === "all") {
        if (
          e.price >= filtering.price[0] &&
          e.price <= filtering.price[1] &&
          moment(e.date).unix() >= filtering.date1 &&
          moment(e.date).unix() <= filtering.date2
        ) {
          return e;
        }
      }
    }
  );

  let Events;
  if (searchText === "") {
    Events = filteredEvents;
  } else if (Eventsearch.length > 0) {
    Events = filteredEvents.filter(
      (e: { title: string; price: number; category: string }) =>
        e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

  return (
    <>
      {Events.map((e: any, i: any) => {
        return <EventCard key={`${e._id}${i}`} Event={e} />;
      })}
    </>
  );
};

export default EventsList;
