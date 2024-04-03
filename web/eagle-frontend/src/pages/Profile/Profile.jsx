import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
  }, [currentUser]);
  return (
    <div className="Profile">
      <NavBar />
      <h1>This page needs a lot of work, but at least it exists now!</h1>
      <Footer />
    </div>
  );
};

export default Profile;
