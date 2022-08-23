import React, { useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import EventCarousel from "./EventCarousel";
import Search from "../UI/Search";
import EventFilterModal from "./EventFilterModal";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  allEventsFail,
  allEventsPending,
  fetchAsyncGetAllEvents,
} from "../../store/Event/Events";
import EventsList from "./EventsList";
import Fail from "../UI/Fail";
import Pending from "../UI/Pending";
const Events = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAsyncGetAllEvents());
  }, [dispatch]);
  const pending = useSelector(allEventsPending);
  const fail = useSelector(allEventsFail);
  return (
    <>
      {fail && <Fail />}
      {pending && <Pending text={"Loading All Events ..."} />}
      {!pending && !fail && (
        <>
          <div className="container-fluid">
            <div className="row my-3">
              <h1
                className="text-info fw-bolder
            "
              >
                Hot & New
              </h1>
            </div>
            <div className="row my-3">
              <EventCarousel />
            </div>
            <div className="row my-3 justify-content-between">
              <div className="col-md-4 col-6 order-1 order-md-1">
                <h1
                  className="text-info fw-bolder
            "
                >
                  Our Events
                </h1>
              </div>
              <div className="col-md-4 col-12 order-3 order-md-2 mt-4 mt-md-0">
                <Search />
              </div>
              <div className="col-md-4 col-6 order-2 order-md-3">
                <button
                  type="button"
                  className="btn btn-warning text-info"
                  style={{ position: "absolute", right: "20px" }}
                  onClick={() => setShowFilterModal(true)}
                >
                  <FontAwesomeIcon
                    icon={faFilter}
                    className=" text-info me-3"
                  />{" "}
                  Filter
                </button>
              </div>
            </div>
            <div className="row my-3 ">
              <EventsList />
            </div>
          </div>
          <EventFilterModal
            setShowFilterModal={setShowFilterModal}
            showFilterModal={showFilterModal}
          />
        </>
      )}
    </>
  );
};

export default Events;
