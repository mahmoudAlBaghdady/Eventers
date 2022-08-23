import React, { MouseEvent, useState, ChangeEvent, FocusEvent } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { UserSignUp } from "../interface/User";
import { AppDispatch } from "../../../store/store";
import { alertToast } from "../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncFoundEmail,
  getEmailFound,
} from "../../../store/Auth/SignUpSlice";

const SignUpFormValidation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const found = useSelector(getEmailFound);
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    offers: false,
  };
  const [user, setUser] = useState<UserSignUp>(initialState);

  type inputChange = ChangeEvent<HTMLInputElement>;

  type textFocus = FocusEvent<HTMLInputElement>;
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [confirmPasswordIsTouched, setconfirmPasswordIsTouched] =
    useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const onChangeHandler = async (e: inputChange) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (emailIsValid) {
      dispatch(fetchAsyncFoundEmail(email));
    }
  };
  const emailBlur = async (event: textFocus) => {
    setEmailIsTouched(true);
    if (emailIsValid) {
      dispatch(fetchAsyncFoundEmail(email));
      found && alertToast("User Alreadt Exist!!");
    }
  };
  const termsOnChangeHandler = (e: ChangeEvent) => {
    setUser({ ...user, terms: !user.terms });
  };
  const offersOnChangeHandler = (e: ChangeEvent) => {
    setUser({ ...user, offers: !user.offers });
  };

  const passwordBlur = (event: textFocus) => {
    setPasswordIsTouched(true);
  };

  const confirmPasswordBlur = (event: textFocus) => {
    setconfirmPasswordIsTouched(true);
  };

  const passwordVisibility = (e: MouseEvent<HTMLSpanElement>) => {
    setPasswordIsVisible((prev) => !prev);
  };
  const emailValidation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordValidtion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  const { email, password, confirmPassword, terms } = user;

  let emailIsValid: boolean = emailValidation.test(email.toLowerCase());

  let passwordIsValid: boolean = passwordValidtion.test(password);
  let confirmPasswordIsValid: boolean =
    passwordIsValid && confirmPassword === password;

  let userIsValid: boolean =
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    terms! &&
    !found;

  const emailError: boolean = !emailIsValid && emailIsTouched;
  const passwordError: boolean = !passwordIsValid && passwordIsTouched;
  const confirmPasswordError: boolean =
    !confirmPasswordIsValid && confirmPasswordIsTouched;
  const reset = () => {
    setUser(initialState);
    setPasswordIsTouched(false);
    setEmailIsTouched(false);
    setPasswordIsVisible(false);
    setconfirmPasswordIsTouched(false);
  };

  const emailClassnameHandler = () => {
    let emailClassname: string;
    if (!emailError && !emailIsTouched) {
      return (emailClassname = "form-control ");
    } else if (emailError) {
      return (emailClassname = "form-control is-invalid");
    } else if (found) {
      return (emailClassname = "form-control is-invalid");
    } else if (!emailError && !found) {
      return (emailClassname = "form-control is-valid");
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
  const confirmPasswordClassNameHandler = () => {
    let confirmPasswordClassName: string;
    if (!confirmPasswordError && !confirmPasswordIsTouched) {
      return (confirmPasswordClassName = "form-control user-select-none ");
    } else if (!confirmPasswordError) {
      return (confirmPasswordClassName =
        "form-control is-valid user-select-none");
    } else if (confirmPasswordError) {
      return (confirmPasswordClassName =
        "form-control is-invalid user-select-none");
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
  };
};

export default SignUpFormValidation;
