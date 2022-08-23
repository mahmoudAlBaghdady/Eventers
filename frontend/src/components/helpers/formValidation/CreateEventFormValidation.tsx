import React, { useState, ChangeEvent, FocusEvent } from "react";
import { Event } from "../interface/Event";

const CreateEventFormValidation = () => {
  const initialState = {
    title: "",
    category: "outdoor",
    description: "",
    brief: "",
    price: 0,
    date: "",
    tickets: 0,
    images: [],
  };
  const [event, setEvent] = useState<Event>(initialState);
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  type inputChange =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>;

  type textFocus =
    | FocusEvent<HTMLInputElement>
    | FocusEvent<HTMLTextAreaElement>;
  const [titleIsTouched, setTitleIsTouched] = useState<boolean>(false);
  const [briefIsTouched, setBriefIsTouched] = useState<boolean>(false);
  const [descriptionIsTouched, setDescriptionIsTouched] =
    useState<boolean>(false);
  const [ticketsIsTouched, setTicketsIsTouched] = useState<boolean>(false);
  const [priceIsTouched, setPriceIsTouched] = useState<boolean>(false);
  const [imagesIsTouched, setImagesIsTouched] = useState(false);
  const [render, setRender] = useState(false);

  ////////////////////////////////////
  const onChangeHandler = async (e: inputChange) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  ///////////////////////////////
  const titleBlur = (event: textFocus) => {
    setTitleIsTouched(true);
  };
  const briefBlur = (event: textFocus) => {
    setBriefIsTouched(true);
  };
  const descriptionBlur = (event: textFocus) => {
    setDescriptionIsTouched(true);
  };
  const ticketsBlur = (event: textFocus) => {
    setTicketsIsTouched(true);
  };
  const priceBlur = (event: textFocus) => {
    setPriceIsTouched(true);
  };
  const imagesBlur = async (e: ChangeEvent<HTMLInputElement>) => {
    setImagesIsTouched(true);
    setEvent({ ...event, images: imageLinks });
  };
  ///////////////////////////

  const { title, brief, description, tickets, price, date, images } = event;

  let titleIsValid: boolean = title.trim().length > 0;
  let briefIsValid: boolean = brief.trim().length > 0 && brief.length <= 128;
  let descriptionIsValid: boolean = description.trim().length > 0;
  let ticketsIsValid: boolean = tickets > 0;
  let priceIsValid: boolean = price >= 0;
  let dateIsValid: boolean = date! > new Date().toISOString();
  let imagesIsValid: boolean = images.length > 0 && images.length <= 9;

  let eventIsValid: boolean =
    titleIsValid &&
    briefIsValid &&
    descriptionIsValid &&
    ticketsIsValid &&
    priceIsValid &&
    dateIsValid &&
    imagesIsValid;

  const titleError: boolean = !titleIsValid && titleIsTouched;
  const briefError: boolean = !briefIsValid && briefIsTouched;
  const descriptionError: boolean = !descriptionIsValid && descriptionIsTouched;
  const ticketsError: boolean = !ticketsIsValid && ticketsIsTouched;
  const priceError: boolean = !priceIsValid && priceIsTouched;
  const imagesError: boolean = !imagesIsValid && imagesIsTouched;

  const reset = () => {
    setEvent(initialState);
    setTitleIsTouched(false);
    setBriefIsTouched(false);
    setDescriptionIsTouched(false);
    setTicketsIsTouched(false);
    setPriceIsTouched(false);
    setImagesIsTouched(false);
  };

  const titleClassNameHandler = () => {
    let titleClassName: string;
    if (!titleError && !titleIsTouched) {
      return (titleClassName = "form-control user-select-none ");
    } else if (!titleError) {
      return (titleClassName = "form-control is-valid user-select-none");
    } else if (titleError) {
      return (titleClassName = "form-control is-invalid user-select-none");
    }
  };
  const briefClassNameHandler = () => {
    let briefClassName: string;
    if (!briefError && !briefIsTouched) {
      return (briefClassName = "form-control  ");
    } else if (!briefError) {
      return (briefClassName = "form-control is-valid ");
    } else if (briefError) {
      return (briefClassName = "form-control is-invalid ");
    }
  };
  const descriptionClassNameHandler = () => {
    let descriptionClassName: string;
    if (!descriptionError && !descriptionIsTouched) {
      return (descriptionClassName = "form-control  ");
    } else if (!descriptionError) {
      return (descriptionClassName = "form-control is-valid ");
    } else if (descriptionError) {
      return (descriptionClassName = "form-control is-invalid ");
    }
  };
  const ticketsClassNameHandler = () => {
    let ticketsClassName: string;
    if (!ticketsError && !ticketsIsTouched) {
      return (ticketsClassName = "form-control user-select-none ");
    } else if (!ticketsError) {
      return (ticketsClassName = "form-control is-valid user-select-none");
    } else if (ticketsError) {
      return (ticketsClassName = "form-control is-invalid user-select-none");
    }
  };
  const priceClassNameHandler = () => {
    let priceClassName: string;
    if (!priceError && !priceIsTouched) {
      return (priceClassName = "form-control user-select-none ");
    } else if (!priceError) {
      return (priceClassName = "form-control is-valid user-select-none");
    } else if (priceError) {
      return (priceClassName = "form-control is-invalid user-select-none");
    }
  };
  const imagesClassNameHandler = () => {
    let imagesClassName: string;
    if (!imagesError && !imagesIsTouched) {
      return (imagesClassName = "form-control  ");
    } else if (!imagesError) {
      return (imagesClassName = "form-control is-valid ");
    } else if (imagesError) {
      return (imagesClassName = "form-control is-invalid ");
    }
  };
  const btnClassname: string = eventIsValid
    ? "btn my-5 btn-lg w-100 btn-outline-primary"
    : "btn my-5 btn-lg w-100 btn-outline-primary disabled";

  return {
    setEvent,
    event,
    setImageLinks,
    onChangeHandler,
    titleBlur,
    briefBlur,
    descriptionBlur,
    ticketsBlur,
    priceBlur,
    imagesBlur,
    imagesIsValid,
    titleClassNameHandler,
    briefClassNameHandler,
    descriptionClassNameHandler,
    ticketsClassNameHandler,
    priceClassNameHandler,
    imagesClassNameHandler,
    btnClassname,
    eventIsValid,
    reset,
  };
};

export default CreateEventFormValidation;
