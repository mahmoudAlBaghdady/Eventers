import Event from "../../database/models/event";
import User from "../../database/models/user";
import { transformEvent } from "./resolverHelpers";
import Booking from "../../database/models/booking";
import { v2 as cloudinary } from "cloudinary";
export default module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  userCreatedEvents: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    try {
      const userFound = await User.findById(req.userId).populate(
        "createdEvents"
      );
      console.log(userFound);
      if (!userFound) {
        throw new Error("UserNot Found");
      }
      return userFound;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createEvent: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    let imagesArr: any[] = [];
    for (let i = 0; i < args.eventInput.images.length; i++) {
      const result = await cloudinary.uploader.upload(
        args.eventInput.images[i],
        {
          public_id: `${args.eventInput.title}${new Date(
            args.eventInput.date
          )}${i}`,
          folder: "Eventers",
          allowedFormats: ["jpeg", "png", "jpg"],
        }
      );
      // console.log(result.url, result.public_id);
      imagesArr.push({
        public_id: result.public_id.toString(),
        url: result.secure_url,
      });
      console.log(imagesArr);
    }

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      category: args.eventInput.category,
      brief: args.eventInput.brief,
      tickets: +args.eventInput.tickets,
      images: [...imagesArr],
      author: req.userId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const author = await User.findById(req.userId);

      if (!author) {
        throw new Error("User not found.");
      }
      author.createdEvents.push(event);
      await author.save();

      return createdEvent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEvent: async (args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!!!!");
    }
    try {
      const event = await Event.findByIdAndDelete(args.eventId);
      if (!event) {
        throw new Error("Event not found.");
      }
      for (let i = 0; i < event.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
          event.images[i].public_id
        );
        console.log(result);
      }

      const bookings = await Booking.find({ event: args.eventId });
      bookings.forEach(async (element: any) => {
        await Booking.findByIdAndDelete(element._id);
      });
      return transformEvent(event);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  singleEvent: async (args: any) => {
    try {
      const event = await Event.findById(args.eventId);
      if (!event) {
        throw new Error("Event not found.");
      }
      return transformEvent(event);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

// ,
//       function (error: any, result: any) {
//         console.log(error);
//         // console.log(result);
//         // const { url, public_id } = result;
//         // imagesArr.push({ url, public_id });
//       }

// args.eventInput.images.forEach(async (element: string, i: number) => {
//   try {
//     await cloudinary.uploader.upload(
//       element.replace(/(\r\n|\n|\r)/gm,""),
//       {
//         public_id: `${args.eventInput.title}${new Date(
//           args.eventInput.date
//         )}${i}`,
//         folder: "Eventers",
//         allowedFormats: ["jpeg", "png", "jpg"],
//       },
//       function (error: any, result: any) {
//         console.log(error);
//         console.log(result);
//         // const { url, public_id } = result;
//         // imagesArr.push({ url, public_id });
//       }
//     );
//   } catch (error) {
//     console.log(error)
//   }
// });
