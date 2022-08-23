import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  bookingSearch,
  fetchAsyncCancelBooking,
  fetchAsyncGetAllBookings,
  GetBookings,
  gettingBookingFail,
  gettingBookingPending,
} from "../../../store/Booking/Booking";
import { AppDispatch } from "../../../store/store";
import Fail from "../../UI/Fail";
import Pending from "../../UI/Pending";
import Search from "../../UI/Search";

const Booking = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncGetAllBookings());
  }, [dispatch]);
  let allBookings = useSelector(GetBookings);
  const searchText = useSelector(bookingSearch);
  const fail = useSelector(gettingBookingFail);
  const pending = useSelector(gettingBookingPending);

  const [filter, setFilter] = useState<string>("dateA");
  const filterOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  let filteredBookings = allBookings;

  if (filter)
    switch (filter) {
      case "dateA":
        filteredBookings = allBookings.slice().sort((a: any, b: any) => {
          return b.event.date - a.event.date;
        });
        break;
      case "dateD":
        filteredBookings = allBookings.slice().sort((a: any, b: any) => {
          return a.event.date - b.event.date;
        });
        break;
      case "priceA":
        filteredBookings = allBookings.slice().sort((a: any, b: any) => {
          return a.event.price - b.event.price;
        });
        break;
      case "priceD":
        filteredBookings = allBookings.slice().sort((a: any, b: any) => {
          return b.event.price - a.event.price;
        });

        break;
      default:
        break;
    }
  let bookings = filteredBookings;
  if (searchText === "") {
    bookings = filteredBookings;
  } else if (searchText.length > 0) {
    bookings = filteredBookings.filter(
      (e: { event: any; title: string; price: number; category: string }) =>
        e.event.title
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
    );
  }
  return (
    <>
      {fail && <Fail />}
      {pending && <Pending text={"Loading Your Bookings ..."} />}
      {!pending && !fail && allBookings.length === 0 && (
        <>
          <div className="container fluid ">
            <div className="row my-md-5 mt-4">
              <h1 className="text-center display-3">No Booked Events</h1>
            </div>
            <div className="row my-5 text-center">
              <div className="col-8 offset-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg px-5 text-light fs-2"
                >
                  Explore New Events
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {!pending && !fail && allBookings.length > 0 && (
        <>
          <div className="container fluid">
            <div className="row my-md-5 mt-4">
              <h1 className="text-center display-3">Events Your'e Attending</h1>
            </div>
            <div className="row m-0">
              <div className="col-lg-3  col-md-4 ">
                <label htmlFor="exampleSelect1" className="form-label mt-4">
                  Filter By
                </label>
              </div>
            </div>
            <div className="row  ">
              <div className="col-lg-7 col-md-6  order-md-1 order-2 ms-auto">
                <Search />
              </div>
              <div className="col-lg-3 col-md-4 me-2 mb-4">
                <div className="form-group ">
                  <select
                    className="form-select"
                    id="exampleSelect1"
                    onChange={filterOnChangeHandler}
                  >
                    <option value={"dateA"}>Date (Ascending)</option>
                    <option value={"dateD"}>Date (Descending)</option>
                    <option value={"priceA"}>Price (Ascending)</option>
                    <option value={"priceD"}>Price (Descending)</option>
                  </select>
                </div>
              </div>
            </div>
            {/* display on mobile */}
            <div className="d-md-none mt-3">
              <div className="row">
                {bookings.map((e: any, i: number) => {
                  const { event, createdAt, _id } = e;
                  const { title, images, price, date } = event;
                  return (
                    <div
                      className="col-12 mx-auto my-3"
                      key={`bookingCard${i}`}
                    >
                      <div className="card">
                        <Link
                          to={`/events/details/${event._id}`}
                          className="text-decoration-none"
                        >
                          <img
                            src={images[0].url}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <h5 className="card-title text-uppercase fw-bolder mb-3 fs-2">
                              <div className="row ">
                                <div className="col-8 mx-auto "> {title}</div>
                                <div className="col-4 ms-auto">${price}</div>
                              </div>
                            </h5>

                            <div className="col">
                              <p className="card-text fw-bold text-center">
                                Booked At : &nbsp;
                                {moment
                                  .unix(createdAt / 1000)
                                  .format("DD-MM-YYYY ")}
                              </p>
                              <p className="card-text fw-bold  text-center">
                                Event Date : &nbsp;
                                {moment.unix(date / 1000).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className=" text-center my-4 ">
                          <button
                            className="btn btn-outline-danger "
                            onClick={async () => {
                              await dispatch(fetchAsyncCancelBooking(_id));
                              await dispatch(fetchAsyncGetAllBookings());
                            }}
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* display on md and above */}
            <div className="d-none  d-md-block">
              <div className="row my-5">
                {bookings.map((e: any, i: number) => {
                  const { event, createdAt, _id } = e;
                  const { title, images, price, date } = event;
                  return (
                    <div
                      className="card mb-3"
                      style={{ height: "300px" }}
                      key={`bookingCard${i}`}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={images[0].url}
                            className="img-fluid rounded-start w-100"
                            alt="..."
                            style={{ height: "300px" }}
                          />
                        </div>

                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title text-uppercase fw-bolder mb-3 fs-2">
                              <div className="row ">
                                <div className="col-8 mx-auto "> {title}</div>
                                <div className="col-4 ms-auto">${price}</div>
                              </div>
                            </h5>
                            <div className="col mt-5">
                              <p className="card-text fw-bold text-center">
                                Booked At : &nbsp;
                                {moment
                                  .unix(createdAt / 1000)
                                  .format("DD-MM-YYYY ")}
                              </p>
                              <p className="card-text fw-bold  text-center">
                                Event Date : &nbsp;
                                {moment.unix(date / 1000).format("DD-MM-YYYY ")}
                              </p>
                            </div>
                          </div>
                          <div className="row my-4 text-center ">
                            <div className="col-6  ">
                              <button
                                className="btn btn-outline-danger "
                                onClick={async () => {
                                  await dispatch(fetchAsyncCancelBooking(_id));
                                  await dispatch(fetchAsyncGetAllBookings());
                                }}
                              >
                                Cancel Booking
                              </button>
                            </div>
                            <div className="col-6">
                              <button className="btn btn-outline-primary ">
                                <Link
                                  to={`/events/details/${event._id}`}
                                  className="text-decoration-none text-light"
                                >
                                  Check Details
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Booking;
