import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { searchBookingText } from "../../store/Booking/Booking";
import { searchCreatedEventText, searchEventText } from "../../store/Event/Events";
import { AppDispatch } from "../../store/store";

const Search = () => {
  const [search, setSearch] = useState("");
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  location.pathname === "/events" && dispatch(searchEventText(search));
  location.pathname === "/profile/bookings" &&
    dispatch(searchBookingText(search));
  location.pathname === "/profile/createdEvents" &&
    dispatch(searchCreatedEventText(search));
  return (
    <div className="col-4 w-100">
      <div className="input-group md-form form-sm form-2 pl-0 ">
        <input
          className="form-control my-0 py-1 amber-border p-3 "
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={changeHandler}
        />
        <div className="input-group-append">
          <span className="input-group-text amber lighten-3" id="basic-text1">
            <FontAwesomeIcon
              icon={faSearch}
              className=" text-info"
              role="button"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
