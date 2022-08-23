import Booking from "../../database/models/booking";
import Event from "../../database/models/event";
import { transformEvent, transformBooking } from "./resolverHelpers";

export default module.exports = {
  userBooking: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    try {
      const booking = await Booking.find({ user: req.userId })
        .populate("event")
        .populate("user");
      return booking;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  bookEvent: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    try {
      const alreadyBooked = await Booking.find({
        event: args.eventId,
        user: req.userId,
      });
      if (alreadyBooked.length > 0) {
        throw new Error("Already Booked!!!!");
      }
      const fetchedEvent = await Event.findById(args.eventId);
      const tickets = fetchedEvent.tickets;
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent,
      });

      const result = await booking.save();
      const ticketsUpdate = await Event.findByIdAndUpdate(args.eventId, {
        tickets: tickets - 1,
      });
      return transformBooking(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  cancelBooking: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.findByIdAndDelete(args.bookingId);
      const fetchedEvent = await Event.findById(booking.event._id);

      // console.log(fetchedEvent)
      const tickets = fetchedEvent.tickets;
      const ticketsUpdate = await Event.findByIdAndUpdate(booking.event._id, {
        tickets: tickets + 1,
      });
      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
