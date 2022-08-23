import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userInfo } from "../../../store/Auth/LoginSlice";
import {
  createdEventsSearch,
  fetchAsyncDeleteEvent,
  fetchAsyncUserCreatedEvents,
  userCreatedEvents,
  userCreatedFail,
  userCreatedPending,
} from "../../../store/Event/Events";
import { AppDispatch } from "../../../store/store";
import Fail from "../../UI/Fail";
import Pending from "../../UI/Pending";
import Search from "../../UI/Search";

const CreatedEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncUserCreatedEvents());
  }, [dispatch]);
  const allEvents = useSelector(userCreatedEvents);
  const searchText = useSelector(createdEventsSearch);
  const pending = useSelector(userCreatedPending);
  const fail = useSelector(userCreatedFail);
  let events;
  if (searchText === "") {
    events = allEvents;
  } else if (searchText.length > 0) {
    events = allEvents.filter(
      (e: { title: string; price: number; category: string }) =>
        e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

  return (
    <>
      {fail && <Fail />}
      {pending && <Pending text={"Loading Your Created Events ..."} />}
      {!pending && !fail && allEvents.length === 0 && (
        <>
          <>
            <div className="container fluid ">
              <div className="row my-md-5 mt-4">
                <h1 className="text-center display-3">
                  You Have No Events Created. Join The Eventers Family?
                </h1>
              </div>
              <div className="row my-5 text-center">
                <div className=" col-8 offset-2 my-3 my-lg-auto">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-outline-primary btn-lg"
                      type="button"
                    >
                      <Link
                        to={"/events/createEvents"}
                        className="text-decoration-none text-secondary"
                      >
                        <FontAwesomeIcon icon={faPlus} className="fs-1"/>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
      {!pending && !fail && allEvents.length > 0 && (
        <>
          <div className="container-fluid">
            <div className="row my-4">
              <h1 className="display-3 text-center">Events You Created</h1>
            </div>
            <div className="row my-4">
              <div className="col-md-8 col-10 offset-md-2 offset-1">
                <Search />
              </div>
            </div>
            <div className="row my-4">
              {events.map((e: any, i: number) => {
                const { title, date, brief, images, tickets, _id } = e;
                return (
                  <div className="col-md-6 my-2" key={`createdEvent${i}`}>
                    <div
                      className="card mb-3"
                      style={{ height: "550px", maxHeight: "550px" }}
                    >
                      <img
                        src={images[0].url}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "290px", maxHeight: "290px" }}
                      />
                      <div
                        className="card-body"
                        style={{ height: "170px", maxHeight: "170px" }}
                      >
                        <h5 className="card-title text-uppercase fw-bolder fs-2">
                          {title}
                        </h5>
                        <h6 className="card-text fw-bold ">
                          <span className="text-warning fw-bolder">
                            {tickets}
                          </span>
                          &nbsp; Tickets Left
                        </h6>
                        <p className="card-text text-center">{brief}</p>
                        <p className="card-text text-center">
                          <small className="text-muted">
                            Event Date : &nbsp;{" "}
                            {moment.unix(date / 1000).format("DD-MM-YYYY ")}
                          </small>
                        </p>
                      </div>
                      <div
                        className="row card-body"
                        style={{ height: "50px", maxHeight: "50px" }}
                      >
                        <div className="col-6">
                          <button
                            className="btn btn-outline-danger"
                            onClick={async () => {
                              await dispatch(fetchAsyncDeleteEvent(_id));
                              await dispatch(fetchAsyncUserCreatedEvents());
                            }}
                          >
                            Delete Event
                          </button>
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-outline-primary">
                            <Link
                              to={`/events/details/${_id}`}
                              className="text-decoration-none text-light"
                            >
                              <p className="m-0 d-md-block d-none">
                                Check Details
                              </p>
                              <p className="m-0 d-md-none "> Details</p>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatedEvents;
