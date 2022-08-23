import React, { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "react-calendar/dist/Calendar.css";
import CreateEventFormValidation from "../helpers/formValidation/CreateEventFormValidation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  createEventPending,
  fetchAsyncCreateEvents,
} from "../../store/Event/Events";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../store/Auth/LoginSlice";

//*getting form validation functions

const CreateEvents = () => {
  const {
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
  } = CreateEventFormValidation();

  //*destructuring event elements

  const { title, brief, description, tickets, price, date, category } = event;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loggedIn = useSelector(isLoggedIn);
  //*getting the pending status

  const creatingEventPending = useSelector(createEventPending);

  //*retreiving data from file input and transforming them to base64

  const fileOnChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(e.target.files!);
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        setImageLinks((prevArr: any) => [...prevArr, reader.result]);
      };
    });
  };

  //*submiting the form and creating the event

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (eventIsValid) {
      await dispatch(fetchAsyncCreateEvents(event));
      reset();
      navigate("/events");
    }
  };

  return (
    <>
      {!loggedIn && (
        <>
          <div className="container fluid ">
            <div className="row my-md-5 mt-4">
              <h1 className="text-center display-3">
                You Have To Sign Up To Start Creating Events
              </h1>
            </div>
            <div className="row my-5 text-center">
              <div className="col-lg-7 col-8 offset-2 offset-lg-0 my-3 my-lg-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg px-5 text-light fs-2"
                >
                  <Link
                    to={"/auth/signup"}
                    className="text-decoration-none text-secondary"
                  >
                    Sign Up To Start Creating Events
                  </Link>
                </button>
              </div>
              <div className="col-lg-4 col-8 offset-2 offset-lg-0 my-3 my-lg-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg px-5 text-light fs-2"
                >
                  <Link
                    to={"/auth/login"}
                    className="text-decoration-none text-secondary"
                  >
                    Login
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {loggedIn && (
        <>
          <div className="container">
            <div className="row">
              <form className="my-5" onSubmit={submitHandler}>
                <fieldset>
                  <legend>Create Event</legend>
                  <div className="form-group">
                    <label htmlFor="Title" className="form-label mt-4">
                      Title
                    </label>
                    <input
                      type="text"
                      className={titleClassNameHandler()}
                      name="title"
                      id="Title"
                      aria-describedby="Title"
                      placeholder="Enter Title"
                      maxLength={128}
                      onBlur={titleBlur}
                      onChange={onChangeHandler}
                      value={title}
                    />
                    <div className="invalid-feedback">Please Enter A title</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="brief" className="form-label mt-4">
                      Brief
                    </label>
                    <input
                      type="text"
                      name="brief"
                      id="brief"
                      aria-describedby="brief"
                      placeholder="Introduce your event briefly"
                      maxLength={128}
                      onChange={onChangeHandler}
                      onBlur={briefBlur}
                      className={briefClassNameHandler()}
                      value={brief}
                    />
                    <div className="invalid-feedback">
                      brief must be between 1 And 127 Characters
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="exampleTextarea"
                      className="form-label mt-4"
                    >
                      Description
                    </label>
                    <textarea
                      className={descriptionClassNameHandler()}
                      id="exampleTextarea"
                      name="description"
                      placeholder="enter event journey ,activities ,what your event includes,packages, etc..."
                      rows={3}
                      onChange={onChangeHandler}
                      onBlur={descriptionBlur}
                      value={description}
                    />
                    <div className="invalid-feedback">
                      please enter a description
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formFile" className="form-label mt-4">
                      Upload Images
                    </label>
                    <input
                      className={imagesClassNameHandler()}
                      type="file"
                      multiple
                      accept="image/png,image/jpeg,image/jpg,image/jfif"
                      id="formFile"
                      onChange={fileOnChangeHandler}
                      onBlur={imagesBlur}
                    />
                    <div className="d-grid gap-2 mt-2  ">
                      <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                      >
                        Save Image Choices
                      </button>
                    </div>
                    <div className="invalid-feedback">
                      At least 1 image and at most 9 images is allowed
                    </div>

                    <div className="row my-3">
                      {imagesIsValid &&
                        event.images.map((img: any, i: number) => {
                          return (
                            <div
                              className="col-lg-3 col-md-6 col-12 my-1"
                              key={i}
                            >
                              <img
                                style={{ maxHeight: "300px" }}
                                src={img}
                                className="img-thumbnail w-100 h-100"
                                alt="..."
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="row">
                    <fieldset className="form-group w-md-50 col-md-6">
                      <label className="form-label mt-4">Type</label>{" "}
                      <div className="form-check">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic radio toggle button group"
                        >
                          <input
                            type="radio"
                            className="btn-check"
                            name="category"
                            id="btnradio1"
                            autoComplete="off"
                            value="outdoor"
                            checked={category === "outdoor"}
                            onChange={onChangeHandler}
                          />
                          <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio1"
                          >
                            Out Door{" "}
                          </label>
                          <input
                            type="radio"
                            className="btn-check"
                            name="category"
                            id="btnradio2"
                            value="indoor"
                            autoComplete="off"
                            checked={category === "indoor"}
                            onChange={onChangeHandler}
                          />
                          <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio2"
                          >
                            In Door
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    <div className=" mt-4 w-md-50 col-md-6">
                      <label htmlFor="formFile" className="form-label me-4">
                        Event Date
                      </label>
                      <div className="form-group text-center mt-2 ">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField
                                variant={"standard"}
                                {...props}
                                sx={{
                                  svg: { color: "#378DFC", fontWeight: "bold" },
                                  input: {
                                    color: "#378DFC ",
                                    fontWeight: "bold",
                                  },
                                  label: {
                                    color: "#378DFC",
                                    fontWeight: "bold",
                                  },
                                  borderColor: "text.primary",
                                }}
                              />
                            )}
                            minDateTime={new Date()}
                            value={date}
                            onChange={(newValue) => {
                              setEvent({
                                ...event,
                                date: newValue!.toISOString(),
                              });
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group w-50">
                      <label htmlFor="tickets" className="form-label mt-4">
                        Tickets Available
                      </label>
                      <input
                        type="number"
                        className={ticketsClassNameHandler()}
                        id="tickets"
                        aria-describedby="tickets"
                        name="tickets"
                        placeholder="500"
                        onChange={onChangeHandler}
                        onBlur={ticketsBlur}
                        min={1}
                        value={tickets}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>

                    <div className="form-group w-50">
                      <label className="form-label mt-4">Ticket Price</label>
                      <div className="form-group">
                        <div className="input-group mb-3">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            name="price"
                            min="0"
                            className={priceClassNameHandler()}
                            aria-label="Amount (to the nearest dollar)"
                            onChange={onChangeHandler}
                            onBlur={priceBlur}
                            value={price}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {creatingEventPending ? (
                    <>
                      <div className="row my-3">
                        <div className=" text-center">
                          <div
                            className="spinner-border ms-auto  text-primary"
                            role="status"
                            aria-hidden="true"
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderWidth: "0.5rem",
                            }}
                          />
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className=" text-center">
                          <h1>Uploading Images ...</h1>
                        </div>
                      </div>
                    </>
                  ) : (
                    <button type="submit" className={btnClassname}>
                      Create
                    </button>
                  )}
                </fieldset>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateEvents;

// const [uniqueImages, setUniqueImages] = useState<any>([]);
// const previewFiles = (file: any) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onloadend = () => {
//     setImages((images: any) => [...images, reader.result]);
//   };
// };

// const focusHandler = (e: any) => {
//   fileOnChangeHandler(e);
//   setUniqueImages(
//     images.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
//   );
//   setEvent({ ...event, images: uniqueImages });

//   setImages([]);
// };
// const fileOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//   setFiles(e.currentTarget.files);

//   for (let index = 0; index < files.length; index++) {
//     previewFiles(files[index]);
//   }
//   let uniqueElements = images.filter(
//     (v: any, i: any, a: any) => a.indexOf(v) === i
//   );
//   setUniqueImages(uniqueElements);
//   setEvent({ ...event, images: uniqueImages });

// };
// const deleteImage = (e: any) => {
//   setUniqueImages(
//     images.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
//   );
//   let uniqueElements = uniqueImages.filter((image: any) => image !== e);
//   setUniqueImages(uniqueElements);
//   setEvent({ ...event, images: uniqueImages });

//   setImages([]);
//   setFiles([]);
// };

{
  /* <div className="row">
              {uniqueImages!.map((img: any, i: number) => {
                return (
                  <div className="col-lg-3 col-md-6 col-12" key={i}>
                    <img
                      style={{ maxHeight: "300px" }}
                      src={img}
                      className="img-thumbnail w-100 h-100"
                      alt="..."
                      onClick={() => deleteImage(img)}
                    />
                  </div>
                );
              })}
            </div> */
}

{
  /* <div className="form-group">
              <label htmlFor="formFile" className="form-label mt-4">
                Upload Images
              </label>
              <input
                className="form-control"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/jfif"
                id="formFile"
                onChange={fileOnChangeHandler}
                onBlur={focusHandler}
              />
            </div> */
}
