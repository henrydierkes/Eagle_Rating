import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import RatingForm from "../../components/RatingForm/ratingForm.jsx";
import Footer from "../../components/Footer/Footer";
import "./AddRating.css";

function AddRating() {
  return (
    <div className="AddRating">
      <NavBar />
      <RatingForm />
      <Footer />
    </div>
  );
}

export default AddRating;
