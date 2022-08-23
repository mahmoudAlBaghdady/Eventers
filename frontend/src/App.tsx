import React, { useEffect } from "react";
import "./App.css";
import "bootswatch/dist/morph/bootstrap.min.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import Events from "./components/Events/Events";
import Booking from "./components/Profile/Booking/Booking";
import Navbar from "./components/UI/Navbar/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Terms from "./components/auth/Terms";
import { Toaster } from "react-hot-toast";
import Footer from "./components/UI/Footer/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import CreateEvents from "./components/Events/CreateEvents";
import EventDetails from "./components/Events/EventDetails";
import CreatedEvents from "./components/Profile/CreatedEvents/CreatedEvents";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/terms" element={<Terms />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/createEvents" element={<CreateEvents />} />
        <Route path="/events/details/:id" element={<EventDetails />} />

        {localStorage.getItem("token") && (
          <Route path="/profile/bookings" element={<Booking />} />
        )}
        {localStorage.getItem("token") && (
          <Route path="/profile/createdEvents" element={<CreatedEvents />} />
        )}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
