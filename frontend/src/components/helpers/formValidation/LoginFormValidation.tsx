import React, { MouseEvent, useState, ChangeEvent, FocusEvent } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { UserLogin } from "../interface/User";

const LoginFormValidation = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<UserLogin>(initialState);

  type inputChange = ChangeEvent<HTMLInputElement>;

  type textFocus = FocusEvent<HTMLInputElement>;
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const onChangeHandler = (e: inputChange) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const emailBlur = (event: textFocus) => {
    setEmailIsTouched(true);
  };

  const passwordBlur = (event: textFocus) => {
    setPasswordIsTouched(true);
  };

  const passwordVisibility = (e: MouseEvent<HTMLSpanElement>) => {
    setPasswordIsVisible((prev) => !prev);
  };
  const emailValidation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidtion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  const { email, password } = user;

  let emailIsValid: boolean = emailValidation.test(email.toLowerCase());
  let passwordIsValid: boolean = passwordValidtion.test(password);
  
  let userIsValid: boolean = emailIsValid && passwordIsValid;

  const emailError: boolean = !emailIsValid && emailIsTouched;
  const passwordError: boolean = !passwordIsValid && passwordIsTouched;

  const reset = () => {
    setUser(initialState);
    setPasswordIsTouched(false);
    setEmailIsTouched(false);
    setPasswordIsVisible(false);
  };

  const emailClassnameHandler = () => {
    let emailClassname: string;
    if (!emailError && !emailIsTouched) {
      return (emailClassname = "form-control ");
    } else if (!emailError) {
      return (emailClassname = "form-control is-valid");
    } else if (emailError) {
      return (emailClassname = "form-control is-invalid");
    }
  };

  const passwordClassNameHandler = () => {
    let passwordClassName: string;
    if (!passwordError && !passwordIsTouched) {
      return (passwordClassName = "form-control user-select-none ");
    } else if (!passwordError) {
      return (passwordClassName = "form-control is-valid user-select-none");
    } else if (passwordError) {
      return (passwordClassName = "form-control is-invalid user-select-none");
    }
  };

  let passType: string = passwordIsVisible ? "text" : "password";
  let passIcon = passwordIsVisible ? faEyeSlash : faEye;

  const btnClassname: string = userIsValid
    ? "btn btn-outline-primary  mb-2 w-100 "
    : "btn btn-outline-primary  mb-2 w-100 disabled";

  return {
    setUser,
    user,
    passwordError,
    emailBlur,
    onChangeHandler,
    passwordBlur,
    passwordVisibility,
    emailClassnameHandler,
    passwordClassNameHandler,
    passIcon,
    passType,
    btnClassname,
    userIsValid,
    reset,
  };
};

export default LoginFormValidation;
