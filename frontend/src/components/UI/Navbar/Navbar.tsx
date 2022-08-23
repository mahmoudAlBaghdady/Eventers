import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { isLoggedIn, logout } from "../../../store/Auth/LoginSlice";
import { AppDispatch } from "../../../store/store";
import logo from "../logo/logo.png";

const Navbar = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand mx-lg-3 mx-md-1 me-lg-4 me-md-1" to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="d-inline-block align-text-top me-2"
            width={30}
            height={24}
          />
          Eventers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto ms-lg-5 ms-2 ">
            <li className="nav-item">
              <NavLink className="nav-link my-1 my-lg-0 " to={"/events"}>
                Events
              </NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink
                className="nav-link my-1 my-lg-0"
                to={"/events/createEvents"}
              >
                Create Events
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            {localStorage.getItem("token") && (
              <>
                <div className="dropdown-center">
                  <button
                    className="btn btn-secondary dropdown-toggle px-5 dropdown-toggle-split"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                  </button>
                  <ul className="dropdown-menu bg-primary ">
                    <li>
                      <NavLink
                        className="dropdown-item text-secondary fw-bold"
                        to={"/profile/createdEvents"}
                      >
                        Your Events
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item text-secondary fw-bold"
                        to={"/profile/bookings"}
                      >
                        Your Bookings
                      </NavLink>
                    </li>
                    <li>
                      <hr className="border border-warning border-3 opacity-75" />
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item text-secondary fw-bold"
                        to={"/"}
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {!localStorage.getItem("token")  && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link  my-lg-3 my-1   ms-2"
                    to={"/auth/login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " to={"/auth/signup"}>
                    <button className="btn btn-outline-primary">
                      Start Booking
                    </button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
