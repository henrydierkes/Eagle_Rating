import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Background from "../../components/Background/Background";
import Trending from "../../components/Trending/Trending";
import Category from "../../components/Category/Category";
import TopComments from "../../components/TopComments/TopComments";
import Footer from "../../components/Footer/Footer";

import "./Home.css";
function Home() {
  return (
    <div className="Home">
       <NavBar />
      <Background />
      <Trending />
      <Category />
      <TopComments />
      <Footer />
    </div>
  );
}

export default Home;
