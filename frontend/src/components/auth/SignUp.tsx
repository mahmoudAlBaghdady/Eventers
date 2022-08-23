import React, { FormEvent, KeyboardEvent } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import SignUpFormValidation from "../helpers/formValidation/SignUpFormValidation";
import { UserSignUp } from "../helpers/interface/User";
import { succesToast, alertToast } from "../helpers/toast/Toast";
import {
  fetchAsyncFoundEmail,
  fetchAsyncSignUp,
  getEmailFound,
} from "../../store/Auth/SignUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const found = useSelector(getEmailFound);
  const {
    user,
    emailBlur,
    onChangeHandler,
    passwordBlur,
    passwordVisibility,
    emailClassnameHandler,
    passwordClassNameHandler,
    confirmPasswordClassNameHandler,
    confirmPasswordBlur,
    passIcon,
    passType,
    btnClassname,
    termsOnChangeHandler,
    offersOnChangeHandler,
    confirmPasswordError,
    userIsValid,
    reset,
  } = SignUpFormValidation();

  const { email, password, confirmPassword, offers, terms } = user;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userIsValid) {
      dispatch(fetchAsyncFoundEmail(email));
      dispatch(fetchAsyncSignUp(user));
      reset();
    }
  };
  let invalidEmailText = found ? "Email Is Taken" : "Invalid Email Format";
  return (
    <div className="container">
      <div className="row">
        <form
          className="col-lg-6 col-md-8 offset-lg-3 offset-md-2"
          onSubmit={submitHandler}
        >
          <fieldset>
            <legend className="user-select-none my-4 fw-bolder">Sign Up</legend>
            <div className="form-group">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label mt-4 user-select-none"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                className={emailClassnameHandler()}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={onChangeHandler}
                onBlur={emailBlur}
                value={email}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
              <div className="invalid-feedback">{invalidEmailText}</div>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label mt-4 user-select-none"
                onClick={passwordVisibility}
              >
                Password &nbsp; <FontAwesomeIcon icon={passIcon} />
              </label>
              <input
                type={passType}
                name="password"
                className={passwordClassNameHandler()}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={onChangeHandler}
                onBlur={passwordBlur}
                value={password}
              />
              <div className="invalid-feedback">
                Minimum eight characters, at least one uppercase letter, one
                lowercase letter and one number
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="form-label mt-4 user-select-none"
                onClick={passwordVisibility}
              >
                Confirm Password &nbsp; <FontAwesomeIcon icon={passIcon} />
              </label>
              <input
                type={passType}
                name="confirmPassword"
                className={confirmPasswordClassNameHandler()}
                id="confirmPassword"
                placeholder="ConfirmPassword"
                onChange={onChangeHandler}
                onBlur={confirmPasswordBlur}
                value={confirmPassword}
              />
              {password && confirmPasswordError && (
                <div className="invalid-feedback">passwords doesn't match</div>
              )}
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={termsOnChangeHandler}
                checked={terms}
              />
              <label
                className="form-check-label  user-select-none"
                htmlFor="flexCheckDefault"
              >
                I have read and agreed with eventers &nbsp;
                <Link to={"/auth/terms"} target="_blank">
                  terms and conditions
                </Link>
                .<span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="news"
                onChange={offersOnChangeHandler}
                checked={offers}
              />
              <label
                className="form-check-label  user-select-none"
                htmlFor="news"
              >
                yes, i would like to recieve the latest events and offers
              </label>
            </div>

            <div className="form-group">
              <button className={btnClassname} type="submit">
                Sign Up
              </button>
            </div>
            <div className="form-group my-4 ">
              <p className="user-select-none">
                Already Have An Account <Link to={"/auth/login"}>Login</Link>?
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

