import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  detailsFail,
  detailsPending,
  fetchAsyncDeleteEvent,
  fetchAsyncGetSingleEvent,
  GetSingleEvent,
} from "../../store/Event/Events";
import { AppDispatch } from "../../store/store";
import PicModal from "./PicModal";
import {
  fetchAsyncBookEvent,
  fetchAsyncGetAllBookings,
  GetBookings,
} from "../../store/Booking/Booking";
interface params {
  id: string;
}
const EventDetails = () => {
  const params = useParams() as any;
  const dispatch = useDispatch<AppDispatch>();
  let singleEvent = useSelector(GetSingleEvent);
  const [showPicModal, setShowPicModal] = useState(false);
  const [booked, setBooked] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAsyncGetAllBookings());
    dispatch(fetchAsyncGetSingleEvent(params.id));
    checkIfBooked();
  }, [dispatch, params.id]);
  const {
    title,
    _id,
    category,
    description,
    brief,
    price,
    date,
    tickets,
    author,
    images,
  } = singleEvent;
  const navigate = useNavigate();

  const pending = useSelector(detailsPending);
  const fail = useSelector(detailsFail);
  const eventDeleteHandler = async () => {
    await dispatch(fetchAsyncDeleteEvent(_id));
    navigate("/events");
  };
  const bookEventHandler = async () => {
    await dispatch(fetchAsyncBookEvent(_id));
    navigate("/profile/bookings");
  };
  const bookings = useSelector(GetBookings);

  const checkIfBooked = () => {
    bookings?.map((element: any) => {
      if (
        element.event._id === params.id &&
        element.user._id === localStorage.getItem("userId")
      ) {
        return setBooked(true);
      }
    });
  };
  console.log(booked);
  return (
    <>
      {fail && (
        <div className="row my-5">
          <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 my-5 col-11 mx-auto">
            <div className="alert alert-dismissible alert-danger text-secondary">
              <button
                type="button"
                className="btn-close bg-secondary"
                data-bs-dismiss="alert"
                onClick={() => navigate("/events")}
              />
              <h3 className="alert-heading display-2">Server Error</h3>
              <h4 className="mb-0 text-secondary">
                We Are currently facing some server errors you have nothing to
                do with this <br />
                Please try again later .
              </h4>
            </div>
          </div>
        </div>
      )}
      {pending && (
        <>
          <div className="row my-5">
            <div className=" text-center mt-5">
              <div
                className="spinner-border ms-auto  text-primary"
                role="status"
                aria-hidden="true"
                style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className=" text-center mb-5">
              <h1>Loading Your Event ...</h1>
            </div>
          </div>
        </>
      )}
      {!pending && !fail && (
        <>
          <div className="container-fluid">
            <div className="row my-3">
              <div className="col-lg-10 offset-lg-1">
                <Carousel className="mx-auto">
                  {images?.map((img: any, i: number) => {
                    return (
                      <Carousel.Item
                        interval={3000}
                        style={{ height: "50vh" }}
                        onClick={() => setShowPicModal(true)}
                        key={`imagesDetailsCarousel${i}`}
                      >
                        <img
                          className="d-block w-100 h-100"
                          src={img.url}
                          alt={`${i} image`}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
            <div className="row my-4">
              <div className="alert  alert-secondary">
                <h1 className="fw-bolder display-2 text-uppercase text-info">
                  {title}
                </h1>
                <p className="lead mx-5" style={{ whiteSpace: "pre-wrap" }}>
                  {brief}
                </p>
              </div>
            </div>
            <div className="alert  alert-secondary  ">
              <div className="row my-3">
                <div className="col-md-4 col-12">
                  <div className="alert  alert-warning text-center mb-4">
                    <h3 className="fw-bolder  text-uppercase text-white">
                      Price
                    </h3>
                    <p className="lead text-white fw-bold fs-5">
                      {" "}
                      {price === 0 ? "Free" : `$ ${price}`}
                    </p>
                  </div>

                  <div className="alert  alert-success text-center my-4">
                    <h3 className="fw-bolder  text-uppercase text-white">
                      Category
                    </h3>
                    <p className="lead text-white fs-5 text-capitalize">
                      {category}
                    </p>
                  </div>

                  <div className="alert  alert-primary text-center my-4">
                    <h3 className="fw-bolder  text-uppercase text-white">
                      Tickets Available
                    </h3>
                    <p className="lead text-white fs-5 fw-bold">
                      {tickets === 0 ? "Out Of Tickets" : tickets}
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="alert  alert-info">
                    <h3 className="fw-bolder  text-uppercase text-light ">
                      Description
                    </h3>
                    <p
                      className="lead mx-5 fs-5  text-white"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {description}
                    </p>
                  </div>
                  <div className="alert  alert-light">
                    <h3 className="fw-bolder text-info  text-uppercase ">
                      Date
                    </h3>
                    <p className="lead fs-5   text-info text-center">
                      {moment(date).format("LLLL")}
                    </p>
                  </div>
                  <div className="alert  alert-info">
                    {/* <hr className="border border-warning border-3 opacity-75" /> */}
                    <h3 className="fw-bolder text-white  text-uppercase">
                      The Eventer
                    </h3>
                    <p className="lead fs-5  text-white text-center">
                      {author?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-8 offset-2 d-grid gap-2">
                {localStorage.getItem("userId") !== author?._id &&
                  !localStorage.getItem("token") && (
                    <>
                      <div className="row text-md-center">
                        <div className="col-6 m-auto">
                          <h3 className="text-info">
                            <Link to={"/auth/signup"}>
                              Sign Up To Start Booking Events
                            </Link>
                          </h3>
                        </div>
                        <div className="col-6 m-auto">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-lg disabled text-primary"
                            onClick={bookEventHandler}
                          >
                            Book Event
                          </button>
                        </div>
                      </div>
                    </>
                  )}
              </div>
              {localStorage.getItem("token") &&
                localStorage.getItem("userId") !== author?._id &&
                !booked && (
                  <div className="col-8 offset-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-lg"
                      onClick={bookEventHandler}
                    >
                      Book Event
                    </button>
                  </div>
                )}
              {localStorage.getItem("token") &&
                localStorage.getItem("userId") !== author?._id &&
                booked && (
                  <>
                    <div className="row text-center">
                      <div className="col-6 m-auto">
                        <h3 className="text-info">
                          You Already Booked This Event
                        </h3>
                      </div>
                      <div className="col-6 m-auto">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-lg  text-light"
                          onClick={bookEventHandler}
                        >
                          <Link
                            to={"/profile/bookings"}
                            className="text-decoration-none text-secondary"
                          >
                            Go To All Bookings
                          </Link>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              {localStorage.getItem("userId") === author?._id && (
                <div className="col-8 offset-2 d-grid gap-2 ">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-lg"
                    onClick={eventDeleteHandler}
                  >
                    Delete Event
                  </button>
                </div>
              )}
            </div>
          </div>

          <PicModal
            setShowPicModal={setShowPicModal}
            showPicModal={showPicModal}
            images={images}
          />
        </>
      )}
    </>
  );
};

export default EventDetails;
