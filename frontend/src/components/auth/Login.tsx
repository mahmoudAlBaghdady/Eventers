import React, { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import LoginFormValidation from "../helpers/formValidation/LoginFormValidation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchAsyncLogin } from "../../store/Auth/LoginSlice";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    emailBlur,
    onChangeHandler,
    passwordBlur,
    passwordVisibility,
    emailClassnameHandler,
    passwordClassNameHandler,
    userIsValid,
    passIcon,
    passType,
    btnClassname,
    reset,
  } = LoginFormValidation();
  const navigate = useNavigate();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userIsValid) {
      await dispatch(fetchAsyncLogin(user));
      reset();
      navigate("/events");
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <form
          className="col-lg-6 col-md-8 offset-lg-3 offset-md-2"
          onSubmit={submitHandler}
        >
          <fieldset>
            <legend className="user-select-none my-4 fw-bolder">Login</legend>
            <div className=" mt-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label user-select-none"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                className={emailClassnameHandler()}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={onChangeHandler}
                onBlur={emailBlur}
              />
            </div>
            <div className="mt-4  ">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label  user-select-none "
                onClick={passwordVisibility}
              >
                Password &nbsp; <FontAwesomeIcon icon={passIcon} />
              </label>

              <input
                aria-describedby="basic-addon1"
                name="password"
                type={passType}
                value={user.password}
                className={passwordClassNameHandler()}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={onChangeHandler}
                onBlur={passwordBlur}
              />
              <div className="invalid-feedback">
                Minimum eight characters, at least one uppercase letter, one
                lowercase letter and one number
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className={btnClassname}>
                Login
              </button>
            </div>
            <div className="my-4 ">
              <p className="user-select-none">
                Don't Have An Account ? <Link to={"/auth/signup"}>Sign Up</Link>
                ?
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

// I have read and agreed with the terms and conditions.
// would you like to subscribe to our newsletter
