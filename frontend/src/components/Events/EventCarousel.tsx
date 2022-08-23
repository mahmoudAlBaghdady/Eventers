import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetEvents } from "../../store/Event/Events";

const EventCarousel = () => {
  const navigate = useNavigate();
  const events = useSelector(GetEvents);
  const last4 = events.slice(-4);
  return (
    <Carousel className="mx-auto">
      {last4.map((e: any, i: number) => {
        return (
          <Carousel.Item
            interval={3000}
            style={{ height: "60vh" }}
            key={`alleventCarouselItem${i}`}
            onClick={() => navigate(`/events/details/${e._id}`)}
          >
            <img
              className="d-block w-100 h-100"
              src={e.images[0].url}
              alt="Second slide"
            />
            <Carousel.Caption>
              <div className="bg-secondary bg-opacity-50">
                <h3 className="text-uppercase fw-bolder ">{e.title}</h3>
                <h3>${e.price}</h3>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default EventCarousel;

{
  /* <Carousel.Item interval={3000} style={{ height: "50vh" }}>
        <img
          className="d-block w-100 h-100"
          src="https://source.unsplash.com/random/1600x900"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={3000} style={{ height: "50vh" }}>
        <img
          className="d-block w-100 h-100"
          src="https://source.unsplash.com/random/1600x900"
          alt="Second slide"
        />
      </Carousel.Item> */
}
