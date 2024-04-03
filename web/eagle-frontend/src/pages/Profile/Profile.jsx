import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth hook to access user token
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth(); // Access user token from AuthContext

  useEffect(() => {
    // Your useEffect logic here, if needed
  }, [currentUser]); // Add currentUser to the dependency array if you want to trigger the effect when it changes

  return (
    <div className="Profile">
      <NavBar />
      <h1>User Email: {currentUser ? currentUser.token : ""}</h1> {/* Display user email */}
      <Footer />
    </div>
  );
};

export default Profile;
