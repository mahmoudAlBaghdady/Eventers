import authResolver from "./auth";
import eventResolver from "./event";
import bookingResolver from "./booking";

export default module.exports = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver,
};
