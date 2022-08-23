import Event from "../../database/models/event";
import User from "../../database/models/user";
import { dateToIso } from "../../helpers/date";

export const transformEvent = (event: any) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToIso(event._doc.date),
    author: user.bind(this, event.author),
  };
};

export const transformBooking = (booking: any) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToIso(booking._doc.createdAt),
    updatedAt: dateToIso(booking._doc.updatedAt),
  };
};
export const events = async (eventIds: any): Promise<any> => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event: any) => {
      return transformEvent(event);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const singleEvent = async (eventId: any) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const user = async (userId: any) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
