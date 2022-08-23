import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { EventProps } from "../helpers/interface/Event";
const EventCard = ({ Event }: EventProps) => {
  const { title, brief, price, date, _id, images } = Event;
  const formatDate = moment(date).format("DD-MM-YYYY");
  return (
    <>
      <div className="col-md-6 col-lg-4 col-12 my-3" >
        <Link to={`/events/details/${_id}`} className="text-decoration-none  ">
          <div className="card bg-info mb-3 h-100">
            <img src={images[0]?.url} className="card-img-top" alt="..." style={{height:"20rem"}}/>
            <div className="card-body text-secondary">
              <h5 className="card-title fw-bold text-warning text-capitalize ">
                {title}
              </h5>
              <p className="card-text">{brief}</p>

              <p className="card-text text-warning fw-bolder text-capitalize">
                {price === 0 ? "Free" : `$ ${price}.0`}
              </p>

              <p className="card-text text-secondary">{formatDate}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default EventCard;
