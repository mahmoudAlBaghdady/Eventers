import { Event } from "./Event";

export interface Booking {
  createdAt: string;
  updatedAt: string;
  events?: [Event];
  user: any[];
}
