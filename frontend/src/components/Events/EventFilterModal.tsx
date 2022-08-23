import { Slider, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filtering } from "../../store/Event/Events";
import { AppDispatch } from "../../store/store";
import { Filters } from "../helpers/interface/Filter";
interface Props {
  showFilterModal: boolean;
  setShowFilterModal: (value: boolean) => void;
}

const EventFilterModal = ({ showFilterModal, setShowFilterModal }: Props) => {
  const aYearFromNow = new Date();
  aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 2);
  let date2InitialState = aYearFromNow;
  const [price, setPrice] = useState<number[]>([0, 500]);
  const [category, setCategory] = useState("all");
  const [date1, setDate1] = React.useState<Date | null>(new Date());
  const [date2, setDate2] = React.useState<Date | null>(date2InitialState);
  const categoryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const filters = {
    category,
    price,
    date1: moment(date1).unix(),
    date2: moment(date2).unix(),
  };
  useEffect(() => {
    dispatch(filtering(filters));
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal
      show={showFilterModal}
      onHide={() => setShowFilterModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={`bg-info bg-opacity-50`}
      centered
    >
      <Modal.Header closeButton className="bg-info ">
        <Modal.Title className={`text-light`}>FIlter Events</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <div className="col-12 my-2">
          <legend>Event Type</legend>
        </div>
        <div className="col-12 text-center">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              id="btnradio1"
              autoComplete="off"
              checked={category === "outdoor"}
              onChange={categoryHandler}
              value="outdoor"
              name="category"
            />
            <label className="btn btn-outline-warning" htmlFor="btnradio1">
              Out Door
            </label>
            <input
              type="radio"
              className="btn-check"
              id="btnradio2"
              autoComplete="off"
              checked={category === "indoor"}
              onChange={categoryHandler}
              name="category"
              value="indoor"
            />
            <label className="btn btn-outline-warning" htmlFor="btnradio2">
              In Door
            </label>
            <input
              type="radio"
              className="btn-check"
              id="btnradio3"
              autoComplete="off"
              checked={category === "all"}
              onChange={categoryHandler}
              name="category"
              value="all"
            />
            <label className="btn btn-outline-warning" htmlFor="btnradio3">
              All
            </label>
          </div>
        </div>
        {/* price */}
        <div className="col-12 my-4">
          <legend>Price Range</legend>
        </div>
        <div className="col-12 text-center ">
          <div className="row">
            <div className="col-2">
              <legend className="text-warning">$0</legend>
            </div>
            <div className="col-8">
              <Slider
                getAriaLabel={() => "price range"}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                name="price"
                max={500}
              />
            </div>
            <div className="col-2">
              <legend className="text-warning">$500</legend>
            </div>
          </div>
        </div>

        {/* date */}
        <div className="col-12 my-4">
          <legend>Date Range</legend>
        </div>
        <div className="row text-center ">
          <div className="col-6">
            <div className="form-group text-center my-2 ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      variant={"standard"}
                      {...props}
                      sx={{
                        svg: { color: "#378DFC", fontWeight: "bold" },
                        input: { color: "#378DFC ", fontWeight: "bold" },
                        label: { color: "#378DFC", fontWeight: "bold" },
                        borderColor: "text.primary",
                      }}
                    />
                  )}
                  minDateTime={new Date()}
                  value={date1}
                  onChange={(newValue) => {
                    setDate1(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group text-center mt-2 ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      variant={"standard"}
                      {...props}
                      sx={{
                        svg: { color: "#378DFC", fontWeight: "bold" },
                        input: { color: "#378DFC ", fontWeight: "bold" },
                        label: { color: "#378DFC", fontWeight: "bold" },
                        borderColor: "text.primary",
                      }}
                    />
                  )}
                  minDateTime={date1}
                  value={date2}
                  onChange={(newValue) => {
                    setDate2(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="start">
        <Button
          className="btn btn-outline-info"
          onClick={() => setShowFilterModal(false)}
        >
          Cancel
        </Button>
        <Button
          className="btn btn-outline-warning"
          onClick={() => {
            setShowFilterModal(false);
            dispatch(filtering(filters));
          }}
        >
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventFilterModal;
