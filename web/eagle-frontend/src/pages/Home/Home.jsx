import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import HomeContent from "../Home/HomeContent/HomeContent";
import "./Home.css";
function Home() {
  return (
    <div className="Home">
      <NavBar />
      <HomeContent />
    </div>
  );
}

export default Home;
