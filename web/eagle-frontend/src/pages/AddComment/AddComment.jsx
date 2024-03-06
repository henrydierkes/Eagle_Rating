import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import CommentForm from "../../components/CommentForm/CommentForm";
import Footer from "../../components/Footer/Footer";
import "./AddComment.css";

function AddComment() {
  return (
    <div className="AddComment">
      <NavBar />
      <CommentForm />
      <Footer />
    </div>
  );
}

export default AddComment;
