import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userInfo } from "../../store/Auth/LoginSlice";
import logo from "../UI/logo/logo.png";
import "./Landing.css";
const Landing = () => {
  return (
    <>
      <div className="container-fluid landingImage d-none d-lg-block">
        <div className="row  justify-content-between">
          <div className="col-8 ">
            <h1 className="mx-5  display-2 text-light user-select-none">
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-text-top me-2 my-3 user-select-none"
                width={70}
                height={62}
              />
              Eventers
            </h1>
          </div>{" "}
          {localStorage.getItem("token") && (
            <div className="col-2 my-auto me-1 ">
              <Link
                className="nav-link text-light fs-4"
                to={"/"}
                onClick={() => localStorage.clear()}
              >
                Logout
              </Link>
            </div>
          )}{" "}
          {!localStorage.getItem("token") && (
            <div className="col-1 my-auto">
              <Link className="nav-link text-light fs-4" to={"/auth/login"}>
                Login
              </Link>
            </div>
          )}
          {!localStorage.getItem("token") && (
            <div className="col-2 my-auto me-1">
              <Link className="nav-link text-light fs-4" to={"/auth/signup"}>
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>

        <div className="row ">
          <div className="col-6 offset-3 mt-5 text-center">
            <button className="btn-outline-primary btn">
              <Link
                className="nav-link text-light fs-4 text-decoration-none"
                to={"/events"}
              >
                Explore Our Events
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
      {/* md screens */}
      <div className="container-fluid landingImageMd d-none d-md-block d-lg-none">
        <div className="row  justify-content-between ">
          <div className="col-8  ">
            <h1 className=" mt-3 display-2 text-light user-select-none">
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-text-top me-2 my-3 user-select-none"
                width={70}
                height={62}
              />
              Eventers
            </h1>
          </div>{" "}
          {localStorage.getItem("token") && (
            <div className="col-2 my-auto me-1 ">
              <Link
                className="nav-link text-light fs-4"
                to={"/"}
                onClick={() => localStorage.clear()}
              >
                Logout
              </Link>
            </div>
          )}{" "}
          {!localStorage.getItem("token") && (
            <div className="col-1 my-auto">
              <Link className="nav-link text-light fs-4" to={"/auth/login"}>
                Login
              </Link>
            </div>
          )}
          {!localStorage.getItem("token") && (
            <div className="col-2 my-auto me-1">
              <Link className="nav-link text-light fs-4" to={"/auth/signup"}>
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row ">
          <div className="col-6 offset-3 mt-5 text-center">
            <button className="btn-outline-primary btn">
              <Link
                className="nav-link text-light fs-4 text-decoration-none"
                to={"/events"}
              >
                Explore Our Events
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
      {/* sm screens */}
      <div className="container-fluid landingImageSm  d-md-none w-100">
        <div className="row   ">
          <div className="col-12 text-center ">
            <h1 className=" mt-3 display-2 text-light user-select-none">
              <img
                src={logo}
                alt="logo"
                className="d-inline-block align-text-top me-2 my-2 user-select-none"
                width={50}
                height={42}
              />
              Eventers
            </h1>
          </div>
        </div>
        <div className="row my-4">
          {localStorage.getItem("token") && (
            <div className="col-12 text-center my-auto me-1 ">
              <Link
                className="nav-link text-light fs-4"
                to={"/"}
                onClick={() => localStorage.clear()}
              >
                Logout
              </Link>
            </div>
          )}{" "}
          {!localStorage.getItem("token") && (
            <div className="col-6 my-auto text-center">
              <Link className="nav-link text-light fs-4" to={"/auth/login"}>
                Login
              </Link>
            </div>
          )}
          {!localStorage.getItem("token") && (
            <div className="col-6 my-auto text-center">
              <Link className="nav-link text-light fs-4" to={"/auth/signup"}>
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="row my-5"></div>
        <div className="row my-5"></div>
        <div className="row my-5">
          <div className="col-12   text-center">
            <button className="btn-outline-primary btn">
              <Link
                className="nav-link text-light fs-4 text-decoration-none"
                to={"/events"}
              >
                Explore Our Events
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
