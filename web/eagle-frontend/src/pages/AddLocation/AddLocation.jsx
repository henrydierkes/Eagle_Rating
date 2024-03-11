import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import LocationForm from "../../components/LocationForm/LocationForm"
import Footer from "../../components/Footer/Footer";
import "./AddLocation.css";

function AddLocation() {
  return (
    <div className="AddLocation">
      <NavBar />
      <LocationForm />
      <Footer />
    </div>
  );
}

export default AddLocation;
