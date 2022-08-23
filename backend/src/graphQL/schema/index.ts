import { buildSchema } from "graphql";

export default module.exports = buildSchema(`
type Booking{
  _id:ID!
  createdAt:String!
  updatedAt:String!
  event:Event!
  user:User!
}
type Image{
  public_id:String!
  url:String!
}
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  author: User!
  category:String!
  tickets:Float!
  brief:String!
  images:[Image!]!
}
type User {
  _id: ID!
  email: String!
  password: String
}
type AuthData{
  userId:ID!
  token:String!
  tokenExpiration: Int!
  createdEvents: [Event!]
  email: String!
}
type AuthEmail{
  found:Boolean!
}
type UserCreatedEvents{
  _id: ID!
  email: String!
  createdEvents: [Event!]

}
input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
  category:String!
  tickets:Float!
  brief:String!
  images:[String!]!
}
input UserInput {
  email: String!
  password: String!
}
input SingleEvent{
  id:String!
}
type RootQuery {
    singleEvent(eventId :ID!):Event!
    events: [Event!]!
    bookings(userId:ID!):[Booking!]!
    login(email:String!,password:String!):AuthData!
    emailCheck(email:String!):AuthEmail!
    userBooking:[Booking!]!
    userCreatedEvents: UserCreatedEvents!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    deleteEvent(eventId :ID!):Event
    createUser(userInput: UserInput): User
    bookEvent(eventId :ID!):Booking!
    cancelBooking(bookingId : ID!):Event!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
