import { Slider, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
interface Props {
  showPicModal: boolean;
  setShowPicModal: (value: boolean) => void;
  images: any;
}
const PicModal = ({ showPicModal, setShowPicModal, images }: Props) => {
  return (
    <Modal show={showPicModal} fullscreen onHide={() => setShowPicModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Images</Modal.Title>
      </Modal.Header>
      <Carousel className="mx-auto" style={{ height: "100vh", width: "80vw" }}>
        {images?.map((img: any, i: number) => {
          return (
            <Carousel.Item
              interval={3000}
              style={{ height: "80vh" }}
              key={`imagesModal${i}`}
            >
              <img
                className="d-block w-100  h-100"
                src={img.url}
                alt={`${i} image`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Modal>
  );
};

export default PicModal;
